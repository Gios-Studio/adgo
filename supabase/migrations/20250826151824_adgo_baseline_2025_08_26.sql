create type "public"."report_freq" as enum ('daily', 'weekly', 'monthly');

create type "public"."role_type" as enum ('owner', 'admin', 'manager', 'analyst', 'viewer');

create table "public"."ads" (
    "id" uuid not null default gen_random_uuid(),
    "campaign_id" uuid not null,
    "media_url" text,
    "language" text default 'English'::text,
    "gender" text,
    "age_min" integer,
    "age_max" integer,
    "city" text,
    "created_at" timestamp with time zone default now()
);


create table "public"."campaigns" (
    "id" uuid not null default gen_random_uuid(),
    "org_id" uuid not null,
    "name" text not null,
    "start_date" date,
    "end_date" date,
    "budget" numeric,
    "created_at" timestamp with time zone default now()
);


create table "public"."org_invitations" (
    "id" uuid not null default gen_random_uuid(),
    "org_id" uuid not null,
    "email" text not null,
    "role" role_type not null default 'viewer'::role_type,
    "invited_by" uuid,
    "created_at" timestamp with time zone default now(),
    "expires_at" timestamp with time zone default (now() + '7 days'::interval)
);


create table "public"."org_memberships" (
    "org_id" uuid not null,
    "user_id" uuid not null,
    "role" role_type not null default 'viewer'::role_type,
    "added_at" timestamp with time zone not null default now()
);


alter table "public"."org_memberships" enable row level security;

create table "public"."orgs" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone default now(),
    "created_by" uuid
);


create table "public"."profiles" (
    "id" uuid not null,
    "full_name" text,
    "role" text default 'advertiser'::text,
    "created_at" timestamp with time zone default now()
);


create table "public"."report_subscriptions" (
    "id" uuid not null default gen_random_uuid(),
    "org_id" uuid not null,
    "campaign_id" uuid,
    "frequency" report_freq not null,
    "recipients" text[],
    "active" boolean not null default true,
    "created_at" timestamp with time zone default now()
);


CREATE UNIQUE INDEX ads_campaign_media_uniq ON public.ads USING btree (campaign_id, media_url);

CREATE UNIQUE INDEX ads_pkey ON public.ads USING btree (id);

CREATE UNIQUE INDEX campaigns_org_name_uniq ON public.campaigns USING btree (org_id, name);

CREATE UNIQUE INDEX campaigns_pkey ON public.campaigns USING btree (id);

CREATE INDEX idx_ads_campaign ON public.ads USING btree (campaign_id, created_at DESC);

CREATE INDEX idx_campaigns_org ON public.campaigns USING btree (org_id, created_at DESC);

CREATE INDEX idx_reports_org_campaign ON public.report_subscriptions USING btree (org_id, campaign_id);

CREATE UNIQUE INDEX org_invitations_org_id_email_key ON public.org_invitations USING btree (org_id, email);

CREATE UNIQUE INDEX org_invitations_pkey ON public.org_invitations USING btree (id);

CREATE UNIQUE INDEX org_memberships_pkey ON public.org_memberships USING btree (org_id, user_id);

CREATE UNIQUE INDEX orgs_pkey ON public.orgs USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX report_subscriptions_pkey ON public.report_subscriptions USING btree (id);

alter table "public"."ads" add constraint "ads_pkey" PRIMARY KEY using index "ads_pkey";

alter table "public"."campaigns" add constraint "campaigns_pkey" PRIMARY KEY using index "campaigns_pkey";

alter table "public"."org_invitations" add constraint "org_invitations_pkey" PRIMARY KEY using index "org_invitations_pkey";

alter table "public"."org_memberships" add constraint "org_memberships_pkey" PRIMARY KEY using index "org_memberships_pkey";

alter table "public"."orgs" add constraint "orgs_pkey" PRIMARY KEY using index "orgs_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."report_subscriptions" add constraint "report_subscriptions_pkey" PRIMARY KEY using index "report_subscriptions_pkey";

alter table "public"."ads" add constraint "ads_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE not valid;

alter table "public"."ads" validate constraint "ads_campaign_id_fkey";

alter table "public"."ads" add constraint "ads_campaign_media_uniq" UNIQUE using index "ads_campaign_media_uniq";

alter table "public"."campaigns" add constraint "campaigns_org_id_fkey" FOREIGN KEY (org_id) REFERENCES orgs(id) ON DELETE CASCADE not valid;

alter table "public"."campaigns" validate constraint "campaigns_org_id_fkey";

alter table "public"."campaigns" add constraint "campaigns_org_name_uniq" UNIQUE using index "campaigns_org_name_uniq";

alter table "public"."org_invitations" add constraint "org_invitations_invited_by_fkey" FOREIGN KEY (invited_by) REFERENCES auth.users(id) not valid;

alter table "public"."org_invitations" validate constraint "org_invitations_invited_by_fkey";

alter table "public"."org_invitations" add constraint "org_invitations_org_id_email_key" UNIQUE using index "org_invitations_org_id_email_key";

alter table "public"."org_invitations" add constraint "org_invitations_org_id_fkey" FOREIGN KEY (org_id) REFERENCES orgs(id) ON DELETE CASCADE not valid;

alter table "public"."org_invitations" validate constraint "org_invitations_org_id_fkey";

alter table "public"."org_memberships" add constraint "org_memberships_org_id_fkey" FOREIGN KEY (org_id) REFERENCES orgs(id) ON DELETE CASCADE not valid;

alter table "public"."org_memberships" validate constraint "org_memberships_org_id_fkey";

alter table "public"."org_memberships" add constraint "org_memberships_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."org_memberships" validate constraint "org_memberships_user_id_fkey";

alter table "public"."orgs" add constraint "orgs_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."orgs" validate constraint "orgs_created_by_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."report_subscriptions" add constraint "recipients_email_valid" CHECK (((recipients IS NULL) OR validate_recipients_emails(recipients))) not valid;

alter table "public"."report_subscriptions" validate constraint "recipients_email_valid";

alter table "public"."report_subscriptions" add constraint "report_subscriptions_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE not valid;

alter table "public"."report_subscriptions" validate constraint "report_subscriptions_campaign_id_fkey";

alter table "public"."report_subscriptions" add constraint "report_subscriptions_org_id_fkey" FOREIGN KEY (org_id) REFERENCES orgs(id) ON DELETE CASCADE not valid;

alter table "public"."report_subscriptions" validate constraint "report_subscriptions_org_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.accept_org_invite(p_token text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE v_inv org_invitations;
BEGIN
  SELECT * INTO v_inv FROM org_invitations
  WHERE token = p_token AND accepted_at IS NULL AND expires_at > now()
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid or expired invite';
  END IF;

  -- Add membership
  INSERT INTO org_memberships (org_id, user_id, role)
  VALUES (v_inv.org_id, auth.uid(), v_inv.role)
  ON CONFLICT (org_id, user_id) DO UPDATE SET role = EXCLUDED.role;

  UPDATE org_invitations SET accepted_at = now() WHERE id = v_inv.id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.add_current_user_to_org(p_org_id uuid, p_role role_type DEFAULT 'owner'::role_type)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO org_memberships (org_id, user_id, role)
  VALUES (p_org_id, auth.uid(), p_role)
  ON CONFLICT (org_id, user_id) DO UPDATE SET role = EXCLUDED.role;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.campaign_is_visible_to_me(p_campaign_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM campaigns c
    JOIN org_memberships m ON m.org_id = c.org_id
    WHERE c.id = p_campaign_id AND m.user_id = auth.uid()
  );
$function$
;

CREATE OR REPLACE FUNCTION public.create_org_invite(p_org_id uuid, p_email text, p_role role_type DEFAULT 'viewer'::role_type)
 RETURNS org_invitations
 LANGUAGE plpgsql
AS $function$
DECLARE v_token text := encode(gen_random_bytes(24), 'hex');
DECLARE v_inv org_invitations;
BEGIN
  IF NOT has_org_role(p_org_id, ARRAY['owner','admin']::role_type[]) THEN
    RAISE EXCEPTION 'Not authorized to invite for this org';
  END IF;

  INSERT INTO org_invitations (org_id, email, role, token)
  VALUES (p_org_id, p_email, p_role, v_token)
  RETURNING * INTO v_inv;

  RETURN v_inv;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.dispatch_due_reports()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Example: select due subscriptions; later post to your webhook / email service
  PERFORM 1 FROM report_subscriptions rs
  WHERE rs.active = true
    AND rs.frequency = 'weekly';  -- adjust logic to check "due" by date
END;
$function$
;

CREATE OR REPLACE FUNCTION public.has_org_role(p_org_id uuid, roles role_type[])
 RETURNS boolean
 LANGUAGE sql
 STABLE
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM org_memberships m
    WHERE m.org_id = p_org_id AND m.user_id = auth.uid() AND m.role = ANY(roles)
  );
$function$
;

CREATE OR REPLACE FUNCTION public.is_org_member(p_org_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM org_memberships m
    WHERE m.org_id = p_org_id AND m.user_id = auth.uid()
  );
$function$
;

CREATE OR REPLACE FUNCTION public.trg_org_owner()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.created_by IS NOT NULL THEN
    INSERT INTO org_memberships (org_id, user_id, role)
    VALUES (NEW.id, NEW.created_by, 'owner')
    ON CONFLICT (org_id, user_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$function$
;

create or replace view "public"."v_campaign_ads" as  SELECT c.org_id,
    c.id AS campaign_id,
    c.name AS campaign_name,
    a.id AS ad_id,
    a.media_url,
    a.city,
    a.created_at
   FROM (campaigns c
     JOIN ads a ON ((a.campaign_id = c.id)));


create or replace view "public"."v_org_campaigns" as  SELECT o.id AS org_id,
    o.name AS org_name,
    c.id AS campaign_id,
    c.name AS campaign_name,
    c.start_date,
    c.end_date,
    c.budget,
    c.created_at
   FROM (orgs o
     JOIN campaigns c ON ((c.org_id = o.id)));


CREATE OR REPLACE FUNCTION public.validate_recipients_emails(arr text[])
 RETURNS boolean
 LANGUAGE sql
 IMMUTABLE
AS $function$
  SELECT bool_and(elem ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')
  FROM unnest(arr) AS elem;
$function$
;

grant delete on table "public"."ads" to "anon";

grant insert on table "public"."ads" to "anon";

grant references on table "public"."ads" to "anon";

grant select on table "public"."ads" to "anon";

grant trigger on table "public"."ads" to "anon";

grant truncate on table "public"."ads" to "anon";

grant update on table "public"."ads" to "anon";

grant delete on table "public"."ads" to "authenticated";

grant insert on table "public"."ads" to "authenticated";

grant references on table "public"."ads" to "authenticated";

grant select on table "public"."ads" to "authenticated";

grant trigger on table "public"."ads" to "authenticated";

grant truncate on table "public"."ads" to "authenticated";

grant update on table "public"."ads" to "authenticated";

grant delete on table "public"."ads" to "service_role";

grant insert on table "public"."ads" to "service_role";

grant references on table "public"."ads" to "service_role";

grant select on table "public"."ads" to "service_role";

grant trigger on table "public"."ads" to "service_role";

grant truncate on table "public"."ads" to "service_role";

grant update on table "public"."ads" to "service_role";

grant delete on table "public"."campaigns" to "anon";

grant insert on table "public"."campaigns" to "anon";

grant references on table "public"."campaigns" to "anon";

grant select on table "public"."campaigns" to "anon";

grant trigger on table "public"."campaigns" to "anon";

grant truncate on table "public"."campaigns" to "anon";

grant update on table "public"."campaigns" to "anon";

grant delete on table "public"."campaigns" to "authenticated";

grant insert on table "public"."campaigns" to "authenticated";

grant references on table "public"."campaigns" to "authenticated";

grant select on table "public"."campaigns" to "authenticated";

grant trigger on table "public"."campaigns" to "authenticated";

grant truncate on table "public"."campaigns" to "authenticated";

grant update on table "public"."campaigns" to "authenticated";

grant delete on table "public"."campaigns" to "service_role";

grant insert on table "public"."campaigns" to "service_role";

grant references on table "public"."campaigns" to "service_role";

grant select on table "public"."campaigns" to "service_role";

grant trigger on table "public"."campaigns" to "service_role";

grant truncate on table "public"."campaigns" to "service_role";

grant update on table "public"."campaigns" to "service_role";

grant delete on table "public"."org_invitations" to "anon";

grant insert on table "public"."org_invitations" to "anon";

grant references on table "public"."org_invitations" to "anon";

grant select on table "public"."org_invitations" to "anon";

grant trigger on table "public"."org_invitations" to "anon";

grant truncate on table "public"."org_invitations" to "anon";

grant update on table "public"."org_invitations" to "anon";

grant delete on table "public"."org_invitations" to "authenticated";

grant insert on table "public"."org_invitations" to "authenticated";

grant references on table "public"."org_invitations" to "authenticated";

grant select on table "public"."org_invitations" to "authenticated";

grant trigger on table "public"."org_invitations" to "authenticated";

grant truncate on table "public"."org_invitations" to "authenticated";

grant update on table "public"."org_invitations" to "authenticated";

grant delete on table "public"."org_invitations" to "service_role";

grant insert on table "public"."org_invitations" to "service_role";

grant references on table "public"."org_invitations" to "service_role";

grant select on table "public"."org_invitations" to "service_role";

grant trigger on table "public"."org_invitations" to "service_role";

grant truncate on table "public"."org_invitations" to "service_role";

grant update on table "public"."org_invitations" to "service_role";

grant delete on table "public"."org_memberships" to "anon";

grant insert on table "public"."org_memberships" to "anon";

grant references on table "public"."org_memberships" to "anon";

grant select on table "public"."org_memberships" to "anon";

grant trigger on table "public"."org_memberships" to "anon";

grant truncate on table "public"."org_memberships" to "anon";

grant update on table "public"."org_memberships" to "anon";

grant delete on table "public"."org_memberships" to "authenticated";

grant insert on table "public"."org_memberships" to "authenticated";

grant references on table "public"."org_memberships" to "authenticated";

grant select on table "public"."org_memberships" to "authenticated";

grant trigger on table "public"."org_memberships" to "authenticated";

grant truncate on table "public"."org_memberships" to "authenticated";

grant update on table "public"."org_memberships" to "authenticated";

grant delete on table "public"."org_memberships" to "service_role";

grant insert on table "public"."org_memberships" to "service_role";

grant references on table "public"."org_memberships" to "service_role";

grant select on table "public"."org_memberships" to "service_role";

grant trigger on table "public"."org_memberships" to "service_role";

grant truncate on table "public"."org_memberships" to "service_role";

grant update on table "public"."org_memberships" to "service_role";

grant delete on table "public"."orgs" to "anon";

grant insert on table "public"."orgs" to "anon";

grant references on table "public"."orgs" to "anon";

grant select on table "public"."orgs" to "anon";

grant trigger on table "public"."orgs" to "anon";

grant truncate on table "public"."orgs" to "anon";

grant update on table "public"."orgs" to "anon";

grant delete on table "public"."orgs" to "authenticated";

grant insert on table "public"."orgs" to "authenticated";

grant references on table "public"."orgs" to "authenticated";

grant select on table "public"."orgs" to "authenticated";

grant trigger on table "public"."orgs" to "authenticated";

grant truncate on table "public"."orgs" to "authenticated";

grant update on table "public"."orgs" to "authenticated";

grant delete on table "public"."orgs" to "service_role";

grant insert on table "public"."orgs" to "service_role";

grant references on table "public"."orgs" to "service_role";

grant select on table "public"."orgs" to "service_role";

grant trigger on table "public"."orgs" to "service_role";

grant truncate on table "public"."orgs" to "service_role";

grant update on table "public"."orgs" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."report_subscriptions" to "anon";

grant insert on table "public"."report_subscriptions" to "anon";

grant references on table "public"."report_subscriptions" to "anon";

grant select on table "public"."report_subscriptions" to "anon";

grant trigger on table "public"."report_subscriptions" to "anon";

grant truncate on table "public"."report_subscriptions" to "anon";

grant update on table "public"."report_subscriptions" to "anon";

grant delete on table "public"."report_subscriptions" to "authenticated";

grant insert on table "public"."report_subscriptions" to "authenticated";

grant references on table "public"."report_subscriptions" to "authenticated";

grant select on table "public"."report_subscriptions" to "authenticated";

grant trigger on table "public"."report_subscriptions" to "authenticated";

grant truncate on table "public"."report_subscriptions" to "authenticated";

grant update on table "public"."report_subscriptions" to "authenticated";

grant delete on table "public"."report_subscriptions" to "service_role";

grant insert on table "public"."report_subscriptions" to "service_role";

grant references on table "public"."report_subscriptions" to "service_role";

grant select on table "public"."report_subscriptions" to "service_role";

grant trigger on table "public"."report_subscriptions" to "service_role";

grant truncate on table "public"."report_subscriptions" to "service_role";

grant update on table "public"."report_subscriptions" to "service_role";

create policy "memberships_delete"
on "public"."org_memberships"
as permissive
for delete
to public
using (has_org_role(org_id, ARRAY['owner'::role_type, 'admin'::role_type]));


create policy "memberships_insert"
on "public"."org_memberships"
as permissive
for insert
to public
with check (has_org_role(org_id, ARRAY['owner'::role_type, 'admin'::role_type]));


create policy "memberships_select"
on "public"."org_memberships"
as permissive
for select
to public
using (((auth.uid() = user_id) OR has_org_role(org_id, ARRAY['owner'::role_type, 'admin'::role_type])));


create policy "memberships_update"
on "public"."org_memberships"
as permissive
for update
to public
using (has_org_role(org_id, ARRAY['owner'::role_type, 'admin'::role_type]));


CREATE TRIGGER org_auto_owner AFTER INSERT ON public.orgs FOR EACH ROW EXECUTE FUNCTION trg_org_owner();


