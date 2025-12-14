import { useState } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import Button from "../../../components/button/Button";
import { Link } from "react-router";

const EventCard = ({ event }) => {
  const [showInfo, setShowInfo] = useState(false);


  return (
    <div
      onClick={() => {
        setShowInfo(!showInfo);
      }}
      className="relative w-full h-64 md:h-72 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
    >
      {/* Background Image */}
      <img
        src={event.bannerImage || "https://www.bbcclub.com/wp-content/uploads/2022/03/bbcclub-connect-photography-02.jpg"}
        alt={event.title}
        className={`w-full h-full object-cover transition-transform duration-500 ${showInfo ? "scale-110" : "group-hover:scale-110"}`}
      />

      {/* Event Name Overlay */}
      <div className="absolute top-1/4 md:top-2/6 w-full bg-accent/80 px-3 py-1 text-white font-bold text-lg z-10 text-center">
        {event.title}
      </div>

      {/* Hover Info */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 shadow-lg transition-transform duration-500 ${
          showInfo
            ? "translate-y-0"
            : "translate-y-full md:group-hover:translate-y-0"
        }`}
      >
        <div className="flex flex-col gap-2">
          {/* Date */}
          <div className="flex items-center gap-2">
            <FaCalendarAlt />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <span>{event.location}</span>
          </div>

          {/* Details Button */}
        <Link to={`/event-details/${event._id}`}><Button icon={FaInfoCircle} name="View Details"/></Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
