import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ConsentReport() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("consent_report_view").select("*").then(({ data }) => {
      if (data) setRows(data);
    });
  }, []);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Consent Report</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>User</th>
            <th>Consent</th>
            <th>Status</th>
            <th>Granted At</th>
            <th>Revoked At</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.user_id + r.consent_type}>
              <td>{r.email}</td>
              <td>{r.consent_type}</td>
              <td>{r.granted ? "Granted" : "Revoked"}</td>
              <td>{r.granted_at}</td>
              <td>{r.revoked_at || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}