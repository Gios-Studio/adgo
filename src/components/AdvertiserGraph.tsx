import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function AdvertiserGraph({ data }: { data: any[] }) {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="ctr" stroke="#8884d8" name="CTR %" />
      <Line type="monotone" dataKey="spend" stroke="#82ca9d" name="Spend (KES)" />
      <Line type="monotone" dataKey="budget" stroke="#ff7300" name="Budget (KES)" />
    </LineChart>
  );
}