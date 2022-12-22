import WithAction from "./Navbar/Navbar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Home() {
  const { isAuth } = useSelector((s) => s.auth);
  const router = useRouter();
  useEffect(() => {
    if (!isAuth) {
      router.push("/auth/login");
    }
  }, [isAuth]);
  return <>This is Home Page</>;
}
