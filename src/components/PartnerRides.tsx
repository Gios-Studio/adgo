export default function PartnerRides({ rides }: { rides: any[] }) {
  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="px-4 py-2">Ride ID</th>
          <th className="px-4 py-2">Campaign</th>
          <th className="px-4 py-2">Attribution</th>
        </tr>
      </thead>
      <tbody>
        {rides.map((r) => (
          <tr key={r.id}>
            <td className="border px-4 py-2">{r.id}</td>
            <td className="border px-4 py-2">{r.campaign_id}</td>
            <td className="border px-4 py-2">{r.attribution}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}