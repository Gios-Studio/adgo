import Footer from "@/components/Footer";

export default function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}