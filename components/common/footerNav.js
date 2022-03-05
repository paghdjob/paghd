import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect } from "react";
import Cookies from "universal-cookie";

// const InstallPWA = React.lazy(() => import("../installapp/installPWA"));

const InstallPWA = dynamic(() => import("../installapp/installPWA"), {
  ssr: false,
});

function FooterNav() {
  const cookies = new Cookies();
  const isSocial = cookies.get("socialPostSend");
  // const rndInt1 = Math.floor(Math.random() * 400);
  // console.log("autoPost start -  ", rndInt1);
  useEffect(() => {
    if (!isSocial) {
      const rndInt = Math.floor(Math.random() * 300);
      console.log("autoPost start -  ", rndInt);
      cookies.set("socialPostSend", 1, { path: "/", maxAge: rndInt });
      fetch("/v2/autopost/linkedin/postJobLinkedin.php").then((res) =>
        res.json()
      );
      fetch("/v2/autopost/fb/postJobFacebook.php").then((res) => res.json());
      fetch("/v2/autopost/twitter/tweet.php").then((res) => res.json());
    }
  }, []);

  return (
    <footer className="container mt-3 mb-5">
      <div className="row">
        <p>
          &copy; 2020–2021 Paghd jobs. &nbsp;
          <Link href="/legal/privacy-policy">
            <a className="pe-2">Privacy Policy</a>
          </Link>
          <Link href="/legal/terms-conditions">
            <a className="pe-2">Terms & Conditions</a>
          </Link>
          <Link href="/legal/about-us">
            <a className="pe-2">About Us</a>
          </Link>
          <Link href="https://www.facebook.com/paghdcom">
            <a target="_blank" className="pe-2" aria-current="Facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
              </svg>
            </a>
          </Link>
          <Link href="https://twitter.com/Paghdjob">
            <a target="_blank" className="pe-2" aria-current="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
              </svg>
            </a>
          </Link>
          <Link href="https://www.linkedin.com/in/paghd-jobs">
            <a target="_blank" className="pe-2" aria-current="Linkedin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
              </svg>
            </a>
          </Link>
          <InstallPWA />
        </p>
      </div>
    </footer>
  );
}

export default FooterNav;
