import {
  FaUsers,
  FaRegBuilding,
  FaClipboardList,
  FaCalendarAlt,
} from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: ["adminSummary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-summary");
      return res.data;
    },
  });

  const summary = data || {};

  const cards = [
    {
      title: "Users",
      count: summary.users,
      icon: <FaUsers className="text-4xl" />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Clubs",
      count: summary.totalClubs,
      icon: <FaRegBuilding className="text-4xl" />,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Members",
      count: summary.members,
      icon: <FaClipboardList className="text-4xl" />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Events",
      count: summary.events,
      icon: <FaCalendarAlt className="text-4xl" />,
      color: "from-orange-500 to-orange-700",
    },
  ];
  return (
    <div className="p-6 md:p-10 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="card shadow-xl bg-gray-100 hover:shadow-2xl transition-all rounded-2xl"
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="card-title text-lg font-semibold">
                    {card.title}
                  </h2>
                  <p className="text-3xl font-bold">{card.count}</p>
                </div>

                <div
                  className={`p-4 rounded-xl text-white bg-linear-to-br ${card.color}`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
