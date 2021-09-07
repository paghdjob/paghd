import Link from "next/link";
import dynamic from "next/dynamic";

const InstallPWA = dynamic(() => import("../installapp/installPWA"));

function HeaderNav() {
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link href="/">
              <a className="nav-link active" aria-current="page">
                Home
              </a>
            </Link>
          </li>

          <li className="nav-item">
            <Link href="/job?title=software&loc=Mumbai,%20India">
              <a className="nav-link">Search job in Mumbai, India</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/job/lead-software-developer">
              <a className="nav-link">job details</a>
            </Link>
          </li>
           
        </ul>
      </header>
      <div><InstallPWA /></div>
    </div>
  );
}

export default HeaderNav;
