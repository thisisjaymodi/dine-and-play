import Button from "../../ui/Button.jsx";
import Badge from "../../ui/Badge.jsx";
import Card from "../../ui/Card.jsx";
import {
  FaUtensils, FaGamepad, FaCalendarCheck, FaStar,
  FaShieldHalved, FaBolt, FaUsers, FaCircleCheck,
  FaArrowRight, FaQuoteLeft, FaEnvelope, FaPhone, FaLocationDot,
} from "react-icons/fa6";

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

const About = () => (
  <Section id="about">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Text side */}
      <div className="flex flex-col gap-6">
        <div>
          <Badge variant="primary" className="mb-3">About Nexus</Badge>
          <SectionHeading>
            We believe great nights{" "}
            <span className="text-primary">start with great choices</span>
          </SectionHeading>
        </div>

        <p className="text-base-content/60 leading-relaxed">
          Nexus was born from a simple idea — why should you have to choose between
          a great meal and a great time? We partner with the finest restaurants and
          entertainment venues to give you both, seamlessly.
        </p>
        <p className="text-base-content/60 leading-relaxed">
          Our team of experience curators vets every partner so you never have to
          gamble on a bad night out. From date nights to corporate events, we've got
          you covered.
        </p>

        <Button
          to="/about"
          variant="primary"
          wide
          className="rounded-full gap-2 self-start"
        >
          Our Story <FaArrowRight />
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-5">
        {[
          { value: "120+", label: "Curated Venues", color: "bg-primary/10 text-primary" },
          { value: "50K+", label: "Happy Guests", color: "bg-secondary/10 text-secondary" },
          { value: "98%", label: "Satisfaction Rate", color: "bg-accent/10 text-accent" },
          { value: "12", label: "Cities & Growing", color: "bg-warning/10 text-warning" },
        ].map(({ value, label, color }) => (
          <Card
            key={label}
            className={`border-none ${color} bg-opacity-10 rounded-3xl`}
            bodyClassName="p-8 gap-2"
          >
            <span className="text-4xl font-black">{value}</span>
            <span className="text-sm font-medium opacity-80">{label}</span>
          </Card>
        ))}
      </div>
    </div>
  </Section>
);

export default About;



