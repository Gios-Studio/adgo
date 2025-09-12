// pages/_app.tsx
import type { AppProps } from "next/app";
import App from "@/App";
import "@/styles/globals.css"; // keep if you have global styles

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <App>
      <Component {...pageProps} />
    </App>
  );
}