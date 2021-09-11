import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Logo from '../../public/icons/logo.png';
import Cookies from "universal-cookie";

function HeaderNav() {
  const cookies = new Cookies();
  let userIds = cookies.get("userID");
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <Link href="/">
            <span className="fs-4">
              <Image
                src={Logo}
                alt="paghd jobs"
                width="250px"
                height="48px"
              />
            </span>
          </Link>
        </div>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link href="/">
              <a className="nav-link" aria-current="page">
                Home
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/job?title=software&loc=Mumbai,%20India">
              <a className="nav-link">People</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/job/lead-software-developer">
              <a className="nav-link">Company</a>
            </Link>
          </li>
          <li className="nav-item">
            {userIds && <Link href="/login/logout"><a className="nav-link">Log Out</a></Link>}
            {!userIds && <Link href="/login"><a className="nav-link">Log In</a></Link>}
          </li>
        </ul>
      </header>
    </div>
  );
}

export default HeaderNav;
