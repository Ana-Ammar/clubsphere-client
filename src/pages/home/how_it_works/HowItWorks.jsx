import { FiSearch, FiUsers, FiCalendar, FiZap } from "react-icons/fi";

const steps = [
  {
    icon: <FiSearch className="w-10 h-10 text-blue-600" />,
    title: "Discover Clubs",
    desc: "Explore hundreds of campus clubs and find the perfect one for you.",
  },
  {
    icon: <FiUsers className="w-10 h-10 text-green-600" />,
    title: "Join Easily",
    desc: "Send membership requests with just a single tap.",
  },
  {
    icon: <FiCalendar className="w-10 h-10 text-purple-600" />,
    title: "Attend Events",
    desc: "Track upcoming workshops, meetings & club activities.",
  },
  {
    icon: <FiZap className="w-10 h-10 text-orange-600" />,
    title: "Grow Your Network",
    desc: "Connect with amazing people and build real skills.",
  },
];

const HowItWorks = () => {
    return (
            <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">How ClubSphere Works</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-2xl shadow p-6 text-center hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="font-bold text-lg mb-2">{step.title}</h3>
            <p className="text-accent-content">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
    );
};

export default HowItWorks;