import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  if (pathname == "/login") return <Component {...pageProps} />;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
