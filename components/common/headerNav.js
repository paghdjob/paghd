import Link from "next/link";
 
function HeaderNav() {
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <Link href="/">
            <span className="fs-4">
              <i className="bi bi-heptagon-fill"></i> Paghd jobs
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
            <Link href="/">
              <a className="nav-link">My Profile</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/">
              <a className="nav-link">Log Out</a>
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default HeaderNav;
