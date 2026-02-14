import { Outlet, useParams, useLocation } from "react-router";
import Footer from "../components/Footer";
import CookieConsentBanner from "../components/CookieConsentBanner";

const RESTAURANT_CONFIG = {
  "demo-bistro": {
    name: "Demo Bistro",
    logoText: "DB",
    menuUrl: "https://www.example.com/menu",
  },
};

const toTitleFromSlug = (slug = "") =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const buildInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const TenantLayout = () => {
  const { slug = "" } = useParams();
  const location = useLocation();

  const fallbackName = toTitleFromSlug(slug) || "Restaurant";
  const fallbackMenuUrl = `https://www.google.com/search?q=${encodeURIComponent(`${fallbackName} menu`)}`;

  const restaurant = RESTAURANT_CONFIG[slug] ?? {
    name: fallbackName,
    logoText: buildInitials(fallbackName),
    menuUrl: fallbackMenuUrl,
  };

  const isGamePage = location.pathname.includes('/play/');

  return (
    <div className="min-h-screen flex flex-col bg-base-200 text-base-content overflow-x-hidden">
      {!isGamePage && (
        <header className="bg-base-100 border-b border-base-300">
          <div className="max-w-5xl mx-auto px-4 py-8 text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 text-primary border border-primary/20 grid place-items-center text-lg font-bold">
              {restaurant.logoText}
            </div>

            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-base-content/50">
              Now Playing At
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold">{restaurant.name}</h1>

            <a
              href={restaurant.menuUrl}
              className="btn btn-primary btn-sm sm:btn-md mt-5 rounded-full"
            >
              Restaurant Menu
            </a>
          </div>
        </header>
      )}

      <main className="flex-1 w-full">
        <section className={isGamePage ? "w-full" : "max-w-5xl mx-auto px-4 py-8 sm:py-10"}>
          {!isGamePage && (
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold">
                {location.pathname.includes('/claim') ? 'Claim Your Prize' :
                  location.pathname.includes('/coupon') ? 'Your Reward' :
                    'Available Games'}
              </h2>
              <p className="text-sm text-base-content/60 mt-1">
                {location.pathname.includes('/claim') ? 'Please provide your details to receive your coupon.' :
                  location.pathname.includes('/coupon') ? 'Show this screen to your server to redeem.' :
                    'Choose a game below and start playing.'}
              </p>
            </div>
          )}

          <div className={isGamePage ? "" : "bg-base-100 border border-base-300 rounded-2xl shadow-sm p-4 sm:p-6"}>
            <Outlet />
          </div>
        </section>
      </main>
      {!isGamePage && <Footer />}
    </div>
  );
};

export default TenantLayout;
