import Link from "next/link";
import dynamic from "next/dynamic";

/* const InstallPWA = dynamic(() => import("../installapp/installPWA"), {
  ssr: false,
}); */

function FooterNav() {
  return (
    <footer className="container">
      <p>
        &copy; 2020–2021 Paghd jobs. &nbsp;
        <Link href="/legal/privacy-policy">
          <a>Privacy Policy</a>
        </Link>
        <Link href="/legal/terms-conditions">
          <a> Terms & Conditions</a>
        </Link>
      </p>
    </footer>
  );
}

export default FooterNav;
