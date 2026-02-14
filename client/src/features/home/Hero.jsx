import Button from "../../ui/Button.jsx";
import Badge from "../../ui/Badge.jsx";
import StatCard from "../../ui/StatCard.jsx";
import {
  FaUtensils, FaGamepad, FaCalendarCheck, FaStar,
  FaShieldHalved, FaBolt, FaUsers, FaCircleCheck,
  FaArrowRight, FaQuoteLeft, FaEnvelope, FaPhone, FaLocationDot,
} from "react-icons/fa6";

const STATS = [
  { value: "120+", label: "Partner Venues" },
  { value: "50K+", label: "Happy Guests" },
  { value: "4.9★", label: "Average Rating" },
  { value: "3 yrs", label: "In Operation" },
];

const Hero = () => (
  <section
    id="home"
    className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-base-100"
  >
    {/* Background decorative blobs */}
    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

    <div className="relative max-w-4xl mx-auto text-center z-10">
      <Badge variant="primary" className="gap-2 mb-6">
        <FaBolt className="h-3 w-3" /> Now live in 12 cities
      </Badge>

      <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-base-content leading-[1.05] tracking-tight mb-6">
        Dine. Play.
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Unforgettable.
        </span>
      </h1>

      <p className="text-lg md:text-xl text-base-content/60 max-w-2xl mx-auto mb-10 leading-relaxed">
        Nexus blends world-class dining with immersive entertainment — all in one
        seamless platform. Discover, book, and experience more.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          to="/signup"
          variant="primary"
          size="lg"
          className="rounded-full px-8 gap-2 shadow-lg shadow-primary/30"
        >
          Start Exploring <FaArrowRight />
        </Button>
        <Button
          to="/about"
          variant="ghost"
          size="lg"
          className="rounded-full px-8 border border-base-300"
        >
          Learn More
        </Button>
      </div>

      {/* Trust bar */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
        {STATS.map(({ value, label }) => (
          <StatCard key={label} value={value} label={label} />
        ))}
      </div>
    </div>
  </section>
);

export default Hero;


