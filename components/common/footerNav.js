import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const InstallPWA = dynamic(() => import("../installapp/installPWA"), {
  ssr: false,
});

function FooterNav() {
  const cookies = new Cookies();
  const isSocial = cookies.get("socialPostSend");
  useEffect(() => {
    if (!isSocial) {
      cookies.set("socialPostSend", 1, { path: "/", maxAge: 60 });
      fetch("/v2/autopost/linkedin/postJobLinkedin.php")
    .then((res) => res.json())
    // .then(
    //   (result) => {
    //     console.log("result--", result);
    //   },
    //   (error) => {
    //     console.log("error--", error);
    //   }
    // );
    fetch("/v2/autopost/twitter/tweet.php")
    .then((res) => res.json())
    // .then(
    //   (result) => {
    //     console.log("result--", result);
    //   },
    //   (error) => {
    //     console.log("error--", error);
    //   }
    // );
    }
  }, []);

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
