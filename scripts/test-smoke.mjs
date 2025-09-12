// Run with: node scripts/test-smoke.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function run() {
  console.log("✅ Running smoke tests...");

  // Fraud check
  const { data: fraud } = await supabase.rpc("detect_fraud_extended");
  console.log("Fraud Detection →", fraud);

  // Transactions check
  const { data: tx } = await supabase.from("transactions").select("*").eq("ref", "SPLIT-TEST");
  console.log("Revenue Split →", tx);

  // VAT receipts check
  const { data: vat } = await supabase.from("tax_receipts").select("*").limit(5);
  console.log("VAT Receipts →", vat);
}

run().catch(console.error);