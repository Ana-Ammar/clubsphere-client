import {
  FiTrendingUp,
  FiUsers,
  FiStar,
  FiFeather,
  FiActivity,
  FiCpu,
  FiHeadphones,
  FiBriefcase,
  FiWind,
} from "react-icons/fi";

const benefits = [
  {
    icon: <FiTrendingUp className="w-10 h-10 text-blue-600" />,
    title: "Build Leadership Skills",
    desc: "Get hands-on experience by leading events and teams.",
  },
  {
    icon: <FiUsers className="w-10 h-10 text-green-600" />,
    title: "Meet New People",
    desc: "Make friends across the campus and grow your network.",
  },
  {
    icon: <FiStar className="w-10 h-10 text-yellow-600" />,
    title: "Boost Your CV",
    desc: "Stand out with real-world activities and achievements.",
  },
];

const categories = [
  { icon: <FiFeather className="text-3xl" />, name: "Arts & Culture" },
  { icon: <FiActivity className="text-3xl" />, name: "Sports" },
  { icon: <FiCpu className="text-3xl" />, name: "Tech Clubs" },
  { icon: <FiHeadphones className="text-3xl" />, name: "Music & Drama" },
  { icon: <FiWind className="text-3xl" />, name: "Environment" },
  { icon: <FiBriefcase className="text-3xl" />, name: "Entrepreneurship" },
];

const WhyJoin = () => {
    return (
         <section className="py-16">
      {/* WHY JOIN SECTION */}
      <h2 className="text-3xl font-bold text-center mb-10">Why Join a Club?</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {benefits.map((b, i) => (
          <div
            key={i}
            className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-md transition-all text-center"
          >
            <div className="flex justify-center mb-3">{b.icon}</div>
            <h3 className="font-bold text-lg mb-1">{b.title}</h3>
            <p className="text-gray-600">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* POPULAR CATEGORIES */}
      <h2 className="text-3xl font-bold text-center mb-8">Popular Categories</h2>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
        {categories.map((c, i) => (
          <div
            key={i}
            className="p-5 bg-gray-100 rounded-xl shadow-sm hover:shadow-lg transition text-center"
          >
            <div className="flex justify-center">{c.icon}</div>
            <p className="mt-2 font-semibold text-gray-700 text-sm">{c.name}</p>
          </div>
        ))}
      </div>
    </section>
    );
};

export default WhyJoin;