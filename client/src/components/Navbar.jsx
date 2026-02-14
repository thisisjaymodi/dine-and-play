import { Link as RouterLink } from "react-router";
import { FaBars, FaSun, FaMoon, FaUser } from "react-icons/fa6";
import Button from "../ui/Button.jsx";

const NAV_LINKS = [
  { label: "Home", to: "home" },
  { label: "Features", to: "features" },
  { label: "About", to: "about" },
  { label: "Contact", to: "contact" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <div className="navbar bg-base-100 max-w-7xl mx-auto px-4">

        {/* ── Start: Logo + Mobile Hamburger ── */}
        <div className="navbar-start">

          {/* Hamburger dropdown – hidden on lg+ */}
          <div className="dropdown lg:hidden">
            <Button tabIndex={0} role="button" variant="ghost" size="sm" className="btn-circle">
              <FaBars className="h-5 w-5" />
            </Button>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-48 p-2 shadow-lg border border-base-200 z-[100]"
            >
              {NAV_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <RouterLink to={`/#${to}`} className="font-medium">
                    {label}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo */}
          <RouterLink to="/#" className="btn btn-ghost text-xl font-bold tracking-tight px-2">
            <span className="text-primary">⬡</span> Dine & Play
          </RouterLink>
        </div>

        {/* ── Center: Desktop nav links – hidden below lg ── */}
        <nav className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <Button to={`/#${to}`} variant="ghost" size="sm" className="font-medium text-sm rounded-lg">
                  {label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── End: Theme toggle ── */}
        <div className="navbar-end gap-2">
          <Button
            to="/auth/login"
            variant="primary"
            size="sm"
            className="hidden sm:flex"
            startIcon={<FaUser className="h-3 w-3" />}
          >
            Login
          </Button>

          {/*
           * DaisyUI CSS-only theme controller:
           * Checking this input sets [data-theme="dark"] on <html> automatically.
           * The swap / swap-rotate wrapper handles the icon flip animation.
           */}
          <label
            className="btn btn-ghost btn-sm btn-circle swap swap-rotate"
            aria-label="Toggle color theme"
          >
            <input type="checkbox" className="theme-controller" value="dark" />

            {/* Sun → shown when light mode (checkbox unchecked) */}
            <FaSun className="swap-off h-5 w-5" />

            {/* Moon → shown when dark mode (checkbox checked) */}
            <FaMoon className="swap-on h-5 w-5" />
          </label>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
