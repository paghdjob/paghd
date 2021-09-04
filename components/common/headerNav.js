import Link from "next/link";

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
            <Link href="/search">
              <a className="nav-link">Search job</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/joblist">
              <a className="nav-link">joblist</a>
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default HeaderNav;
