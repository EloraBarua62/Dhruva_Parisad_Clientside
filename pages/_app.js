import store from "@component/app/store";
import Layout from "@component/components/shared/Layout";
import "@component/styles/globals.scss";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  const [role, setRole] = useState("");
  const pathname = usePathname();

  return (
    <Provider store={store}>
      {(pathname === "/admin" || pathname === "/admin/login") ? (
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
  );
}
