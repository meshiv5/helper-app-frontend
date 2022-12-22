import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "../redux/store";
import WithAction from "./Navbar/Navbar";

export function App({ Component, pageProps }) {
  const router = useRouter();
  const isAuth = useSelector((s) => s.auth.isAuth);
  useEffect(() => {
    if (!isAuth) router.push("/auth/login");
  }, [isAuth]);
  return (
    <ChakraProvider>
      <WithAction />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default function PrivateRoute({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <App Component={Component} pageProps={pageProps} />
    </Provider>
  );
}
