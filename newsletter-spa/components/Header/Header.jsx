import { NavLink } from "../Links/NavLink";

export default function Header() {
  return (
    <>
      <header>
        <nav className="navbar nav-shadow">
          <h1>Newsletter</h1>
          <ul>
            <li>
              <a className="nav-link text--regular" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="nav-link text--regular" href="/">
                Log Out
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
