import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4 text-center text-sm text-gray-500 border-t mt-8">
      <p>© {new Date().getFullYear()} AdGo Solutions</p>
      <div className="space-x-4 mt-2">
        <Link href="/docs/privacy-policy-v1.0.pdf" target="_blank">
          Privacy Policy
        </Link>
        <Link href="/docs/refund-policy-v1.0.pdf" target="_blank">
          Refund Policy
        </Link>
      </div>
    </footer>
  );
}