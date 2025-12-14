import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../components/loading_spinner/LoadingSpinner";

const EventRegistrations = () => {

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch events (simple list)
  const { data: data = [], isLoading } = useQuery({
    queryKey: ["eventsRegistration", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/total-event-registrations/${user?.email}`);
      return res.data;
    },
  });
  console.log(data)

  if (isLoading) return <LoadingSpinner />;


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Event Registration Overview</h2>

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Club Name</th>
            <th>Event Name</th>
            <th>Registered Users</th>
            <th>Registrations Status</th>    
          </tr>
        </thead>
        <tbody>
          {data.map((event, idx) => (
            <tr key={event._id}>
              <td>{idx + 1}</td>
              <td>{event.clubName}</td>
              <td>{event.eventName}</td>
              <td>{event.userEmail}</td>
              <td className={`mt-2 text-base-100 badge ${
                      event.eventStatus === "registered"
                        ? "badge-success"
                        : "badge-error"
                    }`}>{event.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventRegistrations;
