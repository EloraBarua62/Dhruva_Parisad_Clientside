import store from "@component/app/store";
import Layout from "@component/components/shared/Layout";
import "@component/styles/globals.scss";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";


export default function App({ Component, pageProps }) {
  const pathname = usePathname();

  return (
    <>
      <Head>
        <title>Dhruva Parishad</title>
        <meta
          name="description"
          content="This is a website of Dhruva Parishad for exam and result management"
        />
        <meta name="keywords" content="Dhruva, Parishad, Bangladesh" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Dhruva Parishad Bangladesh" />
        <meta
          property="og:description"
          content="Dhruva Parishad Exam & Result management"
        />
        <meta property="og:image" content="/public/logo.jpeg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        {pathname === "/admin" || pathname === "/admin/login" ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />{" "}
          </Layout>
        )}

        <Toaster
          toastOptions={{
            position: "top-right",
            style: {
              background: "#283046",
              color: "white",
            },
          }}
        />
      </Provider>
    </>
  );
}
