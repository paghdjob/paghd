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
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.paghd.com/page/privacy-policy.html"
        >
          Privacy Policy
        </a>
        &nbsp;
        <a
          rel="noreferrer"
          target="_blank"
          href="https://www.paghd.com/page/terms-conditions.html"
        >
          Terms & Conditions
        </a>
      </p>
    </footer>
  );
}

export default FooterNav;
