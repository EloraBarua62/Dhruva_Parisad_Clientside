import store from "@component/app/store";
import Layout from "@component/components/shared/Layout";
import "@component/styles/globals.scss";
import { jwtDecode } from "jwt-decode";
import { useEffect, useLayoutEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  const [role, setRole] = useState("");

  useLayoutEffect(() => {
      const token_string = document.cookie;
      // const expire_date = document.cookie.expires;
      // console.log(expire_date)
      if (token_string?.length > 0) {
        const decodeToken = jwtDecode(token_string);
        setRole(decodeToken.role);
      }   
    console.log(role);
  },[]);

  return (
    <Provider store={store}>
      {role === "admin" ? (
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
