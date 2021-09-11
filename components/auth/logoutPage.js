import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Link from "next/link";

const LogoutPage = () => {
  const cookies = new Cookies();
  cookies.set("userID", "", { path: "/" });
  cookies.set("auth", "", { path: "/" });

  return (
    <div className="row">
      <h1 className="col-12">Log Out</h1>
      <p className="col-12">
        If you need help with this account, please check the Help Centre and
        then contact us if needed.
      </p>
    </div>
  );
};
export default LogoutPage;
