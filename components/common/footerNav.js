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
  // const rndInt1 = Math.floor(Math.random() * 400);
  // console.log("autoPost start -  ", rndInt1);
  useEffect(() => {
    if (!isSocial) {
      const rndInt = Math.floor(Math.random() * 300);
      console.log("autoPost start -  ", rndInt);
      cookies.set("socialPostSend", 1, { path: "/", maxAge: rndInt });
      fetch("/v2/autopost/linkedin/postJobLinkedin.php")
      .then((res) => res.json())
      fetch("/v2/autopost/twitter/tweet.php")
      .then((res) => res.json())
      }
  }, []);

  return (
    <footer className="container mt-3">
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
