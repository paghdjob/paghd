import HeaderNav from "../components/common/headerNav";
import FooterNav from "../components/common/footerNav";
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();
  setTimeout(() => {
    router.push('/');
  }, 1000)
  return (
    <>
      <HeaderNav />
      <div className="container pt-5 pb-5 mt-5 mb-5">
        <h1>404 - Page Not Found</h1>
      </div>
      <FooterNav />
    </>
  );
}
