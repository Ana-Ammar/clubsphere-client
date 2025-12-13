import { FiUsers, FiCalendar, FiHome, FiDollarSign } from "react-icons/fi";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/loading_spinner/LoadingSpinner";

const ManagerOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch overview data
  const { data: overview = {}, isLoading } = useQuery({
    queryKey: ["managerSummary", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/club-manager-summary/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Manager Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Clubs Managed */}
        <div className="card bg-base-100 shadow-lg rounded-xl p-6 flex items-center gap-4">
          <div className="bg-primary p-4 rounded-full text-base-100">
            <FiHome size={28} />
          </div>
          <div>
            <p className="text-sm text-accent-content">Clubs Managed</p>
            <h3 className="text-2xl font-bold text-center">
              {overview.clubs.length || 0}
            </h3>
          </div>
        </div>

        {/* Total Members */}
        <div className="card bg-base-100 shadow-lg rounded-xl p-6 flex items-center gap-4">
          <div className="bg-green-500 p-4 rounded-full text-base-100">
            <FiUsers size={28} />
          </div>
          <div>
            <p className="text-sm text-accent-content">Total Members</p>
            <h3 className="text-2xl font-bold text-center">
              {overview.members || 0}
            </h3>
          </div>
        </div>

        {/* Total Events */}
        <div className="card bg-base-100 shadow-lg rounded-xl p-6 flex items-center gap-4">
          <div className="bg-yellow-500 p-4 rounded-full text-base-100">
            <FiCalendar size={28} />
          </div>
          <div>
            <p className="text-sm text-accent-content">Total Events</p>
            <h3 className="text-2xl font-bold text-center">
              {overview.events || 0}
            </h3>
          </div>
        </div>

        {/* Total Payments */}
        <div className="card bg-base-100 shadow-lg rounded-xl p-6 flex items-center gap-4">
          <div className="bg-green-500 p-4 rounded-full text-base-100">
            <FiDollarSign size={28} />
          </div>
          <div>
            <p className="text-sm text-accent-content">Total Payments</p>
            <h3 className="text-2xl font-bold text-center">
              {overview.payments || 0}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerOverview;
