import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import EventCard from "./event_card/EventCard";

const Events = () => {
  const axiosSecure = useAxiosSecure();
  const { data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  return (
    <div className="min-h-screen overflow-x-hidden py-12 px-4 sm:px-6 lg:px-12">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard event={event} key={event?._id}></EventCard>
        ))}
      </div>
    </div>
  );
};

export default Events;
