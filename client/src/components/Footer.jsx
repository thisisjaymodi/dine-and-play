import { Link as RouterLink } from "react-router";
import { FaGithub, FaXTwitter, FaInstagram, FaHeart } from "react-icons/fa6";
import Button from "../ui/Button.jsx";
import CookieConsentBanner from "./CookieConsentBanner.jsx";

const FOOTER_LINKS = [
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Use", to: "/terms" },
      { label: "Cookie Policy", to: "/cookies" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: <FaGithub className="h-5 w-5" />, href: "https://github.com", label: "GitHub" },
  { icon: <FaXTwitter className="h-5 w-5" />, href: "https://x.com", label: "X" },
  { icon: <FaInstagram className="h-5 w-5" />, href: "https://instagram.com", label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="footer items-center text-center gap-8 sm:footer-horizontal sm:items-start sm:text-left">
          <aside className="gap-3 items-center sm:items-start">
            <RouterLink to="/" className="text-2xl font-bold tracking-tight text-base-content">
              <span className="text-primary">Dine &amp; Play</span>
            </RouterLink>
            <p className="text-sm text-base-content/60 max-w-xs leading-relaxed">
              Bringing people together through great food and great experiences.
            </p>
            <div className="flex gap-2 mt-1 justify-center sm:justify-start">
              {SOCIAL_LINKS.map(({ icon, href, label }) => (
                <Button
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  variant="ghost"
                  size="sm"
                  className="btn-circle text-base-content/60 hover:text-primary"
                >
                  {icon}
                </Button>
              ))}
            </div>
          </aside>

          {FOOTER_LINKS.map(({ heading, links }) => (
            <nav key={heading} className="items-center sm:items-start">
              <h6 className="footer-title">{heading}</h6>
              {links.map(({ label, to }) => (
                <Button
                  key={to}
                  to={to}
                  variant="link"
                  className="text-base-content/70 hover:text-base-content p-0 h-auto min-h-0 font-normal no-underline hover:underline justify-start"
                >
                  {label}
                </Button>
              ))}
            </nav>
          ))}
        </div>


        <div className="divider my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-base-content/50">
          <span>
            <span className="inline-block text-base leading-none align-middle mr-1">&copy;</span>
            {new Date().getFullYear()} Dine &amp; Play. All rights reserved.
          </span>
          <span className="flex items-center gap-1">
            Made with <FaHeart className="h-3 w-3 text-error" /> by
            <a
              href="https://www.linkedin.com/in/thisisjaymodi"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover"
            >
              Jay Modi
            </a>
          </span>
        </div>
      </div>
      <CookieConsentBanner />
    </footer>
  );
};

export default Footer;
