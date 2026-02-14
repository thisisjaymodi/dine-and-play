import Button from "../../ui/Button.jsx";
import Badge from "../../ui/Badge.jsx";
import Card from "../../ui/Card.jsx";
import Input from "../../ui/Input.jsx";
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


const Contact = () => (
  <Section id="contact" className="bg-base-200">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      {/* Info side */}
      <div className="flex flex-col gap-8">
        <div>
          <Badge variant="primary" className="mb-3">Contact Us</Badge>
          <SectionHeading>
            Let's start a{" "}
            <span className="text-primary">conversation</span>
          </SectionHeading>
          <p className="mt-4 text-base-content/60 leading-relaxed">
            Have a question, a venue partnership proposal, or just want to say hello?
            We'd love to hear from you.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {[
            { icon: <FaEnvelope />, label: "Email", value: "hello@nexus.io" },
            { icon: <FaPhone />, label: "Phone", value: "+1 (800) 639-8700" },
            { icon: <FaLocationDot />, label: "HQ", value: "San Francisco, CA" },
          ].map(({ icon, label, value }) => (
            <Card key={label} className="border-none bg-base-100 shadow-sm" bodyClassName="flex-row items-center gap-4 p-4">
              <span className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-lg shrink-0">
                {icon}
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] opacity-50 text-base-content">{label}</p>
                <p className="font-bold text-base-content">{value}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Form side */}
      <Card variant="bordered" className="shadow-xl shadow-base-300/50 border-base-200" bodyClassName="gap-6 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="First name" placeholder="Jane" />
          <Input label="Last name" placeholder="Doe" />
        </div>

        <Input label="Email" type="email" placeholder="jane@example.com" />

        <div className="form-control w-full">
          <label className="text-[10px] font-black uppercase tracking-[0.15em] opacity-50 text-base-content mb-2 px-1">
            Subject
          </label>
          <select className="select select-bordered w-full h-14 rounded-2xl bg-base-200/40 border-base-300 transition-all focus:ring-4 focus:ring-primary/10 focus:border-primary font-medium text-base-content">
            <option disabled defaultValue>Pick a topic</option>
            <option>General Inquiry</option>
            <option>Venue Partnership</option>
            <option>Support</option>
            <option>Press & Media</option>
          </select>
        </div>

        <div className="form-control w-full">
          <label className="text-[10px] font-black uppercase tracking-[0.15em] opacity-50 text-base-content mb-2 px-1">
            Message
          </label>
          <textarea
            className="textarea textarea-bordered w-full h-32 resize-none rounded-2xl bg-base-200/40 border-base-300 transition-all focus:ring-4 focus:ring-primary/10 focus:border-primary font-medium text-base-content p-4 text-base leading-relaxed"
            placeholder="Tell us how we can help..."
          />
        </div>

        <Button variant="primary" size="lg" className="w-full rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] transition-transform gap-2 mt-2">
          Send Message <FaArrowRight />
        </Button>
      </Card>

    </div>
  </Section>
);

export default Contact;


