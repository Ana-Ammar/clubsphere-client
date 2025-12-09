import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import Button from "../../../components/button/Button";
import { useNavigate } from "react-router";
import BackButton from "../../../components/back_button/BackButton";

const EventDetails = () => {
  const navigate = useNavigate();
  const event = {
    _id: "evt123",
    clubId: "club456",
    title: "Sunset Photography Walk",
    description:
      "Join us for a relaxing evening photography walk along the riverbanks. Suitable for beginners and pros alike. Bring your camera and capture the beauty of the sunset with fellow photography enthusiasts.",
    eventDate: "2025-12-15T16:00:00Z",
    location: "Banani, Dhaka, Bangladesh",
    isPaid: true,
    eventFee: 300,
    maxAttendees: 20,
    image:
      "https://www.bbcclub.com/wp-content/uploads/2022/03/bbcclub-connect-photography-02.jpg",
    createdAt: "2025-11-01T10:00:00Z",
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <BackButton
        name="Back"
        color="black"
        handleBtn={() => {
          navigate(-1);
        }}
      />

      {/* Event Image */}
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg mb-6">
        <img
          src={event.image || "https://via.placeholder.com/800x400"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-4 py-2 rounded-lg text-2xl font-bold">
          {event.title}
        </div>
      </div>

      {/* Event Info Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3 text-gray-700">
          <FaCalendarAlt className="text-gray-500" />
          <span className="font-medium">
            {new Date(event.eventDate).toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <FaMapMarkerAlt className="text-gray-500" />
          <span className="font-medium">{event.location}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <FaDollarSign className="text-gray-500" />
          <span className="font-medium">
            {event.isPaid ? `${event.eventFee} BDT` : "Free"}
          </span>
        </div>

        {event.maxAttendees && (
          <div className="flex items-center gap-3 text-gray-700">
            <FaUsers className="text-gray-500" />
            <span className="font-medium">
              {event.maxAttendees} attendees max
            </span>
          </div>
        )}

        <p className="text-gray-600 mt-2">{event.description}</p>

        {/* Join Button */}
        <div className="mt-4">
          <Button name="Join Now" onClick={() => console.log("Join clicked")} />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
