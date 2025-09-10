import dynamic from "next/dynamic";

// If AuthForm uses browser-only APIs, dynamic import avoids SSR issues
const AuthForm = dynamic(() => import("@/components/AuthForm"), { ssr: false });

export default function LoginPage() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md rounded-2xl border p-6">
        <h1 className="text-2xl font-semibold mb-4">Sign in to AdGo</h1>
        <AuthForm />
      </div>
    </main>
  );
}