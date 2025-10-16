-- AdGo Platform - Database Schema & Migrations
-- 
-- Copyright (c) 2025 AdGo Solutions Limited.
-- All rights reserved.
-- 
-- This database schema is proprietary and confidential.
-- Unauthorized access, copying, or modification is strictly prohibited.
-- 
-- Build: 20251015_073830

-- =====================================================================
-- Mobile Money provider expansion (Airtel Money + others, future-proof)
-- Safe to re-run (guards included)
-- =====================================================================

-- Ensure enum exists (should already be created in prior migration)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_provider') THEN
    CREATE TYPE payment_provider AS ENUM ('mpesa','airtel_money','other');
  END IF;
END $$;

-- Add more providers if missing
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid
     WHERE t.typname = 'payment_provider' AND e.enumlabel = 'mtn_momo'
  ) THEN
    ALTER TYPE payment_provider ADD VALUE 'mtn_momo';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid
     WHERE t.typname = 'payment_provider' AND e.enumlabel = 'tigo_pesa'
  ) THEN
    ALTER TYPE payment_provider ADD VALUE 'tigo_pesa';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid
     WHERE t.typname = 'payment_provider' AND e.enumlabel = 'vodafone_cash'
  ) THEN
    ALTER TYPE payment_provider ADD VALUE 'vodafone_cash';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid
     WHERE t.typname = 'payment_provider' AND e.enumlabel = 'orange_money'
  ) THEN
    ALTER TYPE payment_provider ADD VALUE 'orange_money';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid
     WHERE t.typname = 'payment_provider' AND e.enumlabel = 'bkash'
  ) THEN
    ALTER TYPE payment_provider ADD VALUE 'bkash';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid
     WHERE t.typname = 'payment_provider' AND e.enumlabel = 'gcash'
  ) THEN
    ALTER TYPE payment_provider ADD VALUE 'gcash';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid
     WHERE t.typname = 'payment_provider' AND e.enumlabel = 'paytm'
  ) THEN
    ALTER TYPE payment_provider ADD VALUE 'paytm';
  END IF;
END $$;

-- ---------------------------------------------------------------------
-- Make intents future-proof with provider_code + country + better unique
-- ---------------------------------------------------------------------

-- Free-form provider code (e.g., 'mpesa_ke', 'airtel_ke', 'mtn_rw', 'xyz_pay')
ALTER TABLE payment_intents
  ADD COLUMN IF NOT EXISTS provider_code text;

-- Country (ISO-3166-1 alpha-2); default KE, enforce 2 uppercase letters
ALTER TABLE payment_intents
  ADD COLUMN IF NOT EXISTS country char(2) DEFAULT 'KE';

-- Basic format check (only if not already present)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conname = 'chk_payment_intents_country_iso2'
  ) THEN
    ALTER TABLE payment_intents
      ADD CONSTRAINT chk_payment_intents_country_iso2
      CHECK (country ~ '^[A-Z]{2}$');
  END IF;
END $$;

-- Optional E.164 check for phone numbers (+, country code, 7-15 digits)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conname = 'chk_payment_intents_phone_e164'
  ) THEN
    ALTER TABLE payment_intents
      ADD CONSTRAINT chk_payment_intents_phone_e164
      CHECK (phone_e164 IS NULL OR phone_e164 ~ '^\+[1-9][0-9]{6,14}$');
  END IF;
END $$;

-- Replace old uniqueness (wallet_id, external_txn_id) with provider-aware unique
-- Drop previous unique index if it exists
DO $$ BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relname = 'uniq_pi_wallet_external_txn_id' AND n.nspname = 'public'
  ) THEN
    DROP INDEX IF EXISTS uniq_pi_wallet_external_txn_id;
  END IF;
END $$;

-- New unique index: avoid double-credit per (wallet, provider, external_txn_id)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relname = 'uniq_pi_wallet_provider_external_txn' AND n.nspname = 'public'
  ) THEN
    CREATE UNIQUE INDEX uniq_pi_wallet_provider_external_txn
      ON payment_intents (wallet_id, provider, external_txn_id)
      WHERE external_txn_id IS NOT NULL;
  END IF;
END $$;

-- Keep existing helpful indexes
CREATE INDEX IF NOT EXISTS idx_pi_provider_status_time
  ON payment_intents (provider, status, created_at DESC);

-- ---------------------------------------------------------------------
-- Trigger function: still idempotent because of unique (wallet, provider, ref)
-- (No change needed if you already created credit_wallet_on_payment_success)
-- ---------------------------------------------------------------------

-- Recreate to ensure it uses the new uniqueness effectively (safe overwrite)
CREATE OR REPLACE FUNCTION credit_wallet_on_payment_success()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'UPDATE'
     AND NEW.status = 'succeeded'
     AND (OLD.status IS DISTINCT FROM NEW.status) THEN

    INSERT INTO transactions (wallet_id, created_by, type, amount_cents, ref, memo)
    VALUES (NEW.wallet_id, NEW.created_by, 'credit', NEW.amount_cents,
            COALESCE(NEW.external_txn_id, NEW.provider_session_id),
            CONCAT('Top-up via ', NEW.provider::text))
    ON CONFLICT DO NOTHING;

    UPDATE wallets
       SET balance_cents = balance_cents + NEW.amount_cents,
           updated_at = now()
     WHERE id = NEW.wallet_id;
  END IF;

  RETURN NEW;
END;
$$;

-- Ensure trigger exists (if you didn’t have it previously)
DROP TRIGGER IF EXISTS trg_pi_credit_on_success ON payment_intents;
CREATE TRIGGER trg_pi_credit_on_success
AFTER UPDATE ON payment_intents
FOR EACH ROW EXECUTE FUNCTION credit_wallet_on_payment_success();

-- ---------------------------------------------------------------------
-- RLS remains as defined previously:
-- - Clients read own intents/events
-- - Writes are by service role (Edge Function / server)
-- ---------------------------------------------------------------------