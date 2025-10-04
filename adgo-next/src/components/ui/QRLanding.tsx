// components/QRLanding.tsx
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type QRLandingProps = {
  promo_code: string;
  ad_id: string;
};

function QRLanding({ promo_code, ad_id }: QRLandingProps) {
  const [redeemed, setRedeemed] = useState(false);
  const handleRedeem = async () => {
    await supabase.from("analytics_events").insert({
      event_type: "promo_apply", ad_id, meta: { promo_code }
    });
    setRedeemed(true);
  };
  return (
    <div>
      <div>Promo: {promo_code}</div>
      <button onClick={handleRedeem} disabled={redeemed}>
        {redeemed ? "Redeemed!" : "Redeem"}
      </button>
    </div>
  );
}



export default QRLanding;