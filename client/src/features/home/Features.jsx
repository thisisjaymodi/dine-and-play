import Badge from "../../ui/Badge.jsx";
import Card from "../../ui/Card.jsx";
import {
  FaUtensils, FaGamepad, FaCalendarCheck, FaStar,
  FaShieldHalved, FaBolt, FaUsers, FaCircleCheck,
  FaArrowRight, FaQuoteLeft, FaEnvelope, FaPhone, FaLocationDot,
} from "react-icons/fa6";

const FEATURES = [
  {
    icon: <FaUtensils className="h-7 w-7" />,
    title: "Curated Dining",
    desc: "Discover handpicked restaurants with exclusive menus crafted for every occasion.",
  },
  {
    icon: <FaGamepad className="h-7 w-7" />,
    title: "Immersive Play",
    desc: "From arcade classics to VR adventures — entertainment for every age and vibe.",
  },
  {
    icon: <FaCalendarCheck className="h-7 w-7" />,
    title: "Instant Booking",
    desc: "Reserve tables, games, and events in seconds. No phone calls, no waiting.",
  },
  {
    icon: <FaShieldHalved className="h-7 w-7" />,
    title: "Safe & Trusted",
    desc: "Every venue is verified. Every experience is backed by our satisfaction guarantee.",
  },
  {
    icon: <FaBolt className="h-7 w-7" />,
    title: "Real-Time Updates",
    desc: "Live availability, wait times, and event alerts pushed straight to your device.",
  },
  {
    icon: <FaUsers className="h-7 w-7" />,
    title: "Group Friendly",
    desc: "Plan outings for large groups effortlessly — split bills, sync schedules, done.",
  },
];

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);

const SectionHeading = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-extrabold text-base-content leading-tight">
    {children}
  </h2>
);

const Features = () => (
  <Section id="features" className="bg-base-200">
    <div className="text-center mb-14">
      <Badge variant="primary" className="mb-3">Why Nexus</Badge>
      <SectionHeading>
        Everything you need,{" "}
        <span className="text-primary">nothing you don't</span>
      </SectionHeading>
      <p className="mt-4 text-base-content/60 max-w-xl mx-auto">
        A platform built for people who want more from their time — not more apps.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {FEATURES.map(({ icon, title, desc }) => (
        <Card
          key={title}
          variant="bordered"
          className="hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          bodyClassName="gap-4"
        >
          <span className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            {icon}
          </span>
          <h3 className="card-title text-base-content">{title}</h3>
          <p className="text-sm text-base-content/60 leading-relaxed">{desc}</p>
        </Card>
      ))}
    </div>
  </Section>
);

export default Features;


