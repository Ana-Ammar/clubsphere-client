import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiCalendar } from 'react-icons/fi';

const MyEvents = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["myEvents", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/my-events/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Events</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Event Title</th>
              <th>Club</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, idx) => (
              <tr key={idx}>
                <td className="flex items-center gap-2">
                  <FiCalendar className="text-blue-500" />
                  {event.eventTitle}
                </td>
                <td>{event.clubName}</td>
                <td>{new Date(event.eventDate).toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${
                      event.eventStatus === "registered"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {event.eventStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEvents;
