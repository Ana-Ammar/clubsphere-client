import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import Button from "../../../components/button/Button";
import { useNavigate, useParams } from "react-router";
import BackButton from "../../../components/back_button/BackButton";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/loading_spinner/LoadingSpinner";

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: event = {}, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}`);
      return res.data[0];
    },
  });

  const { data: checkRegistration = [] } = useQuery({
    queryKey: ["checkRegistration", id, user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/eventRegistrations?eventId=${id}&userEmail=${user.email}`
      );
      return res.data;
    },
  });

  const isRegister = checkRegistration.length > 0 ? true : false;

  const { mutate } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.post("/eventRegistrations", payload);
      console.log(res.data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["checkRegistration", id, user.email]);
      Swal.fire({
        title: "Success!",
        text: "Event Registration Successfull",
        icon: "success",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `${error.message}`,
      });
    },
  });

  const handleRegBtn = () => {
    const regInfo = {
      userEmail: user.email,
      clubId: event.clubId,
      eventId: event._id,
    };

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to register on ${event.title}? event`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(regInfo);
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;

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
          src={event?.eventImage}
          alt={event?.title}
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
          <Button
            handleBtn={handleRegBtn}
            disabled={isRegister ? true : false}
            name={`${
              isRegister ? "You have already regestered" : "Register Now"
            }`}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
