import Link from "next/link";
import React from "react";
import Image from "next/image";
import Logo from "../../public/icons/logo.png";
import Cookies from "universal-cookie";

function HeaderNav() {
  const cookies = new Cookies();
  let userID = cookies.get("userID");
  return (
    <div className="container">
       <header className="d-flex flex-wrap mb-1 mt-1 border-bottom"> 
        <div className="d-flex align-items-center mb-md-0 me-md-auto text-dark text-decoration-none">
          <Link href="/" passHref>
            <span className="fs-4">
              <Image
                className="logo"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" />
                </svg>
                <label className="menuLabel">Home</label>
              </a>
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link href="/job?title=&loc=">
              <a className="nav-link">Jobs</a>
            </Link>
          </li> */}
          <li className="nav-item">
            <Link href="/job/postjob">
              <a className="nav-link">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-5v5h-4v-5h-5v-4h5v-5h4v5h5v4z" />
                </svg>
                <label className="menuLabel">Post Job</label>
              </a>
            </Link>
          </li>
          {userID ? (
            <>
              <li className="nav-item">
                <Link href="/report">
                  <a className="nav-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 19h-4v-4h4v4zm6 0h-4v-8h4v8zm6 0h-4v-13h4v13zm6 0h-4v-19h4v19zm1 2h-24v2h24v-2z"/></svg>
                    <label className="menuLabel">Report</label>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about">
                  <a className="nav-link">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
                    </svg>
                    <label className="menuLabel">Resume</label>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/login/logout">
                  <a className="nav-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 12h-4v-12h4v12zm4.213-10.246l-1.213 1.599c2.984 1.732 5 4.955 5 8.647 0 5.514-4.486 10-10 10s-10-4.486-10-10c0-3.692 2.016-6.915 5-8.647l-1.213-1.599c-3.465 2.103-5.787 5.897-5.787 10.246 0 6.627 5.373 12 12 12s12-5.373 12-12c0-4.349-2.322-8.143-5.787-10.246z"/></svg>
                  <label className="menuLabel">Log Out</label> 
                    </a>
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link href="/login">
                <a className="nav-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
                  </svg>
                  <label className="menuLabel">Log In</label>
                </a>
              </Link>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
}

export default HeaderNav;
