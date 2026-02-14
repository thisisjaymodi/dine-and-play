import Badge from "../../ui/Badge.jsx";
import Card from "../../ui/Card.jsx";
import {
  FaUtensils, FaGamepad, FaCalendarCheck, FaStar,
  FaShieldHalved, FaBolt, FaUsers, FaCircleCheck,
  FaArrowRight, FaQuoteLeft, FaEnvelope, FaPhone, FaLocationDot,
} from "react-icons/fa6";


const TESTIMONIALS = [
  {
    name: "Aisha Rahman",
    role: "Food Blogger",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=Aisha",
    stars: 5,
    quote:
      "Nexus completely changed how I discover new restaurants. The curation is spot-on and booking is genuinely effortless.",
  },
  {
    name: "Marcus Chen",
    role: "Product Designer",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=Marcus",
    stars: 5,
    quote:
      "We used Nexus for our team outing of 20 people. Everything from the venue to the food was seamlessly handled.",
  },
  {
    name: "Sofia Delgado",
    role: "Event Planner",
    avatar: "https://api.dicebear.com/9.x/lorelei/svg?seed=Sofia",
    stars: 5,
    quote:
      "I recommend Nexus to all my clients. The variety of venues and the real-time availability feature is a game-changer.",
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


const Testimonials = () => (
  <Section id="testimonials">
    <div className="text-center mb-14">
      <Badge variant="primary" className="mb-3">Testimonials</Badge>
      <h2 className="text-3xl md:text-4xl font-extrabold text-base-content leading-tight">
        Loved by guests everywhere
      </h2>
      <p className="mt-4 text-base-content/60 max-w-xl mx-auto">
        Don't take our word for it — here's what our community has to say.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {TESTIMONIALS.map(({ name, role, avatar, stars, quote }) => (
        <Card
          key={name}
          className="bg-base-100 border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          bodyClassName="gap-4 p-8 flex flex-col items-start"
        >
          <div className="flex gap-1 mb-2">
            {Array.from({ length: stars }).map((_, i) => (
              <FaStar key={i} className="h-4 w-4 text-warning" />
            ))}
          </div>

          <p className="text-base font-medium text-base-content/80 leading-relaxed flex-1 relative z-10">
            "{quote}"
          </p>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-base-200 w-full">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-10">
                <img src={avatar} alt={name} />
              </div>
            </div>
            <div>
              <p className="font-bold text-sm text-base-content">{name}</p>
              <Badge variant="ghost" size="sm" className="opacity-50 text-[10px] uppercase font-bold tracking-wider px-0 bg-transparent border-0 h-auto min-h-0">
                {role}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </Section>
);


export default Testimonials;


