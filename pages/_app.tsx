// pages/_app.tsx
import type { AppProps } from "next/app";
import App from "@/App";
import "@/styles/globals.css"; // keep if you have global styles
import { Toaster } from "react-hot-toast";
import { builder } from '@builder.io/react';

builder.init("af2d418e03484a10b50b332058b99748");

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <App>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </App>
  );
}