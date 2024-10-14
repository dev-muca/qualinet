import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";

import { AuthProvider } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const withoutLayout = ["/"];
  const disableLayout = withoutLayout.includes(pathname);

  return (
    <>
      <Head>
        <title>Qualinet ⭐ Feedback, Clientes & Fornecedores.</title>
      </Head>
      <AuthProvider>
        {disableLayout ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </AuthProvider>
    </>
  );
}
