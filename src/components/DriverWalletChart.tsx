import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function DriverWalletChart({ data }: { data: any[] }) {
  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="payouts" fill="#82ca9d" name="Driver Payouts" />
    </BarChart>
  );
}