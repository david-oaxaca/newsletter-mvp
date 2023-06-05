import { NavLink } from "../Links/NavLink";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header>
        <nav className="navbar nav-shadow">
          <h1>Newsletter</h1>
          <ul>
            <li>
              <Link className="nav-link text--big" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-link text--big" href="/recipients">
                Recipients
              </Link>
            </li>
            <li>
              <Link className="nav-link text--big" href="/">
                Log Out
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
