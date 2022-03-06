import HeaderNav from "../components/common/headerNav";
import FooterNav from "../components/common/footerNav";
import { useRouter } from "next/router";

export default function Custom500() {
  const router = useRouter();
  setTimeout(() => {
    router.push("/");
  }, 1000);
  return (
    <>
      <HeaderNav />
      <div className="container pt-5 pb-5 mt-5 mb-5">
        <h1>500 - Server-side error occurred</h1>
      </div>
      <FooterNav />
    </>
  );
}
