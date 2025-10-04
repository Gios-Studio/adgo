import Link from "next/link";
export default function Custom500() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-2">500 - Server Error</h1>
      <p className="mb-4">Something went wrong. Please try again later.</p>
      <Link href="/" className="text-blue-600 underline">Go Home</Link>
    </div>
  );
}