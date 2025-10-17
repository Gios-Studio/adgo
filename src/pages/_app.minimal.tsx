// Minimal _app.tsx for debugging Fast Refresh issues
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}