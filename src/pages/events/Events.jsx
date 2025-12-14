import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import EventCard from "./event_card/EventCard";
import useAxios from "../../hooks/useAxios";
import LoadingSpinner from "../../components/loading_spinner/LoadingSpinner";
import { useEffect, useState } from "react";

const Events = () => {
  const axios = useAxios();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.length >= 3 || search.length === 0) {
        setDebouncedSearch(search);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", sort, debouncedSearch],
    queryFn: async () => {
      const res = await axios.get(
        `/events?search=${debouncedSearch}&sort=${sort}`
      );
      return res.data;
    },
  });
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      className="min-h-screen overflow-hidden py-12 px-4 sm:px-6 lg:px-12"
    >
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>

      <div className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl mb-8">
        <input
          type="text"
          className="input-field w-full md:w-1/2"
          placeholder="Search club name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input-field select w-full md:w-1/2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="eventDateDesc">Event Date (Latest)</option>
          <option value="eventDateAsc">Event Date (Oldest)</option>
        </select>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard event={event} key={event?._id}></EventCard>
        ))}
      </div>
    </motion.div>
  );
};

export default Events;
