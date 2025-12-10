import { FaMapMarkerAlt, FaDollarSign, FaUserTie } from "react-icons/fa";
import Button from "../../../components/button/Button";
import BackButton from "../../../components/back_button/BackButton";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const ClubDetails = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: club = {} } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}`);
      return res.data;
    },
  });

  const { data: checkMembership = {} } = useQuery({
    queryKey: ["checkMembership", id, user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/memberships?clubId=${id}&userEmail=${user.email}`
      );
      return res.data;
    },
  });

  const isMember = checkMembership.length > 0 ? true : false;

  const { mutate } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.post("/memberships", payload);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["checkMembership", id, user.email]);

      Swal.fire({
        title: "Success!",
        text: "Membership added successfully.",
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

  const handleJoinBtn = () => {
    const joinInfo = {
      userEmail: user.email,
      clubId: club._id,
    };

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to join to ${club.clubName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(joinInfo);
      }
    });
  };

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* Back Button */}
      <BackButton
        name="Back"
        color="black"
        handleBtn={() => {
          navigate(-1);
        }}
      />

      {/* Banner */}
      <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={
            club.bannerImage ||
            "https://via.placeholder.com/1200x500?text=Club+Banner"
          }
          alt="Club Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title + Category */}
      <div className="mt-6 md:flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold">{club.clubName}</h1>

        <span className="badge badge-primary px-4 py-3 text-base-100 text-sm md:text-base">
          {club.category}
        </span>
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {/* Location */}
        <div className="p-5 bg-gray-100 rounded-2xl flex flex-col items-center text-center">
          <FaMapMarkerAlt className="text-accent-content text-xl mb-2" />
          <p className="text-xs text-accent-content uppercase">Location</p>
          <p className="font-semibold">{club.location}</p>
        </div>

        {/* Membership Fee */}
        <div className="p-5 bg-gray-100 rounded-2xl flex flex-col items-center text-center">
          <FaDollarSign className="text-accent-content text-xl mb-2" />
          <p className="text-xs text-accent-content uppercase">
            Membership Fee
          </p>
          <p className="font-semibold">
            {club.membershipFee === 0 ? "Free" : `${club.membershipFee} BDT`}
          </p>
        </div>

        {/* Manager */}
        <div className="p-5 bg-gray-100 rounded-2xl flex flex-col items-center text-center">
          <FaUserTie className="text-accent-content text-xl mb-2" />
          <p className="text-xs text-accent-content uppercase">Managed By</p>
          <p className="font-semibold">{club.managerEmail}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 bg-gray-100 p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold mb-3">About the Club</h2>
        <p className="opacity-80 leading-relaxed">{club.description}</p>
      </div>

      <div className="my-6">
        <Button
          handleBtn={handleJoinBtn}
          disabled={
            checkMembership.length > 0 || club.managerEmail === user.email
              ? true
              : false
          }
          name={`${isMember ? "You are already Member" : "Join Now"}`}
        ></Button>
      </div>

      {/* Optional Extra Sections */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {/* Events */}
        <div className="p-6 bg-gray-100 rounded-2xl">
          <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
          <p className="text-accent-content text-sm">
            Event integration available — connect your events API here.
          </p>
        </div>

        {/* Members */}
        <div className="p-6 bg-gray-100 rounded-2xl">
          <h3 className="text-lg font-semibold mb-2">Members</h3>
          <p className="text-accent-content text-sm">
            Membership data can be shown here from /memberships API.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClubDetails;
