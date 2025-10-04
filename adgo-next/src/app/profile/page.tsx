"use client";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>User Profile / Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Manage your profile and settings here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
