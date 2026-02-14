import { Link as RouterLink } from "react-router";
import { useEffect, useState } from "react";
import Button from "../ui/Button.jsx";
import Card from "../ui/Card.jsx";

const COOKIE_CONSENT_KEY = "dine_and_play_cookie_consent";

const createConsentPayload = (accepted) => ({
  accepted,
  essential: true,
  analytics: accepted,
  marketing: accepted,
  timestamp: new Date().toISOString(),
});

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existingConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    setVisible(!existingConsent);
  }, []);

  const saveConsent = (accepted) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(createConsentPayload(accepted)));
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <aside className="fixed bottom-4 left-4 right-4 z-[60]">
      <Card
        className="max-w-4xl mx-auto shadow-xl bg-base-100 border-base-300"
        variant="bordered"
        bodyClassName="flex flex-col gap-4 p-6"
      >
        <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between">
          <p className="text-sm text-base-content/80 text-center md:text-left">
            We use essential cookies to run Dine &amp; Play. Under Canadian privacy law (PIPEDA)
            and CASL guidance, we request consent before enabling optional analytics and marketing
            cookies. See our <RouterLink to="/cookies" className="link link-primary font-bold">Cookie Policy</RouterLink>.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-end shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-base-300"
              onClick={() => saveConsent(false)}
            >
              Decline Optional
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => saveConsent(true)}
            >
              Accept Cookies
            </Button>
          </div>
        </div>
      </Card>
    </aside>
  );
};

export default CookieConsentBanner;

