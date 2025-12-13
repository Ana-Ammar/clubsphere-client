import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { FiUsers, FiCalendar } from "react-icons/fi";
import LoadingSpinner from "../../../../components/loading_spinner/LoadingSpinner";

const MemberOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: summary = [], isLoading } = useQuery({
    queryKey: ["memberSummary", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/member-summary/${user?.email}`);
      console.log(res.data)
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Card */}
      <div className="card bg-base-100 shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
        <p className="text-gray-600">
          Here's a quick overview of your memberships and upcoming events.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Clubs Joined */}
        <div className="card bg-blue-500 text-white shadow-lg rounded-xl p-6 flex items-center gap-4">
          <div className="bg-blue-700 p-4 rounded-full">
            <FiUsers size={28} />
          </div>
          <div>
            <p className="text-sm opacity-80">Total Clubs Joined</p>
            <h3 className="text-2xl font-bold text-center">{summary?.clubsJoinedCount}</h3>
          </div>
        </div>

        {/* Total Events Registered */}
        <div className="card bg-green-500 text-white shadow-lg rounded-xl p-6 flex items-center gap-4">
          <div className="bg-green-700 p-4 rounded-full">
            <FiCalendar size={28} />
          </div>
          <div>
            <p className="text-sm opacity-80">Events Registered</p>
            <h3 className="text-2xl font-bold text-center">
              {summary?.eventsRegisteredCount}
            </h3>
          </div>
        </div>
      </div>

      {/* Upcoming Events Table */}
      <div className="card bg-base-100 shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
      
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Event Name</th>
                  {/* <th>Club Name</th> */}
                  <th>Date</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {summary?.upcomingEvents?.map((event, idx) => (
                  <tr key={event._id}>
                    <td>{idx + 1}</td>
                    <td>{event.title}</td>
                    {/* <td>{event.clubName}</td> */}
                    <td>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td>{event.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
     
      </div>
    </div>
  );
};

export default MemberOverview;
