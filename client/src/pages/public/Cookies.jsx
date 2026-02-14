import { useMemo } from "react";

const COOKIE_CONSENT_KEY = "dine_and_play_cookie_consent";

const Cookies = () => {
  const lastChoice = useMemo(() => {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!value) {
      return "No cookie preference has been saved yet.";
    }

    try {
      const parsed = JSON.parse(value);
      return parsed.accepted
        ? "You accepted optional cookies."
        : "You declined optional cookies.";
    } catch {
      return "Your cookie preference is unavailable.";
    }
  }, []);

  return (
    <section className="py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
      <p className="text-base-content/80 mb-3">
        Dine &amp; Play uses essential cookies required for secure operation and user sessions.
        Optional cookies are used for analytics and marketing only after consent.
      </p>
      <p className="text-base-content/80 mb-3">
        In line with Canadian privacy expectations (including PIPEDA and CASL consent principles),
        we provide clear accept and decline controls for optional cookies.
      </p>
      <p className="text-base-content/80 mb-8">
        You can change your preference by clearing site data and selecting a new option in the
        cookie banner when it appears again.
      </p>

      <div className="alert bg-base-200 border border-base-300">
        <span className="text-sm">{lastChoice}</span>
      </div>
    </section>
  );
};

export default Cookies;
