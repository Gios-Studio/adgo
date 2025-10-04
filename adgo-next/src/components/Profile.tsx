
"use client";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

export default function Profile() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>User Profile / Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">User metadata will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
