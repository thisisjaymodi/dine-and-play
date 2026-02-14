import Button from "../../ui/Button.jsx";
import Badge from "../../ui/Badge.jsx";
import Card from "../../ui/Card.jsx";
import {
  FaCircleCheck,
} from "react-icons/fa6";


const PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    desc: "Perfect for solo explorers just getting started.",
    features: ["3 bookings per month", "Basic venue access", "Email support", "Standard listings"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/ month",
    desc: "For enthusiasts who dine and play regularly.",
    features: ["Unlimited bookings", "Priority reservations", "Exclusive member deals", "24/7 live support", "Group booking tools"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Business",
    price: "$39",
    period: "/ month",
    desc: "Built for teams, companies, and event planners.",
    features: ["Everything in Pro", "Team dashboard", "Custom invoicing", "Dedicated account manager", "API access"],
    cta: "Contact Sales",
    highlight: false,
  },
];

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);


const Pricing = () => (
  <Section id="pricing" className="bg-base-200">
    <div className="text-center mb-14">
      <Badge variant="primary" className="mb-3">Pricing</Badge>
      <h2 className="text-3xl md:text-4xl font-extrabold text-base-content leading-tight">
        Simple, transparent pricing
      </h2>
      <p className="mt-4 text-base-content/60 max-w-xl mx-auto">
        No hidden fees. No surprise charges. Pick the plan that fits your lifestyle.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {PLANS.map((plan) => {
        const isHighlight = plan.highlight;
        return (
          <Card
            key={plan.name}
            className={`border transition-all duration-300 relative ${isHighlight
              ? "bg-primary text-primary-content border-primary shadow-2xl shadow-primary/30 scale-105 z-10"
              : "bg-base-100 border-base-200 hover:border-primary/40 hover:shadow-lg"
              }`}
            bodyClassName="gap-6 p-8"
          >
            {isHighlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="secondary" className="font-bold shadow-md uppercase tracking-wider text-[10px] py-3">
                  Most Popular
                </Badge>
              </div>
            )}

            <div className="space-y-1">
              <h3 className={`text-xl font-black ${isHighlight ? "text-primary-content" : "text-base-content"}`}>
                {plan.name}
              </h3>
              <p className={`text-xs font-medium ${isHighlight ? "text-primary-content/80" : "text-base-content/50"}`}>
                {plan.desc}
              </p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className={`text-5xl font-black ${isHighlight ? "text-primary-content" : "text-base-content"}`}>
                {plan.price}
              </span>
              {plan.period && (
                <span className={`text-sm font-bold ${isHighlight ? "text-primary-content/60" : "text-base-content/40"}`}>
                  {plan.period}
                </span>
              )}
            </div>

            <ul className="space-y-3 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm font-medium">
                  <FaCircleCheck
                    className={`mt-0.5 shrink-0 ${isHighlight ? "text-white" : "text-primary"}`}
                  />
                  <span className={isHighlight ? "text-primary-content/90" : "text-base-content/70"}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              to="/auth/signup"
              variant={isHighlight ? "ghost" : "outline"}
              className={`w-full rounded-xl h-12 font-bold ${isHighlight
                ? "bg-white text-primary hover:bg-white/90 border-0 shadow-lg shadow-black/10"
                : "hover:bg-primary hover:text-white hover:border-primary border-base-300"
                }`}
            >
              {plan.cta}
            </Button>
          </Card>
        );
      })}
    </div>
  </Section>

);


export default Pricing;


