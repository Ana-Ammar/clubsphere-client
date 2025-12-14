
import { FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import Button from "../../../components/button/Button";
import { Link } from "react-router";

const ClubCard = ({ club }) => {

  return (
    <div
     
      className="card justify-between  bg-gray-100 shadow-lg rounded-2xl border border-gray-200 hover:shadow-2xl transition duration-300"
    >
      {/* Image */}
      <figure>
        <img
          src={
            club.bannerImage ||
            "https://www.russell.ca/en/recreation-and-culture/resources/Photo-Club/Photography-Banner.jpeg"
          }
          alt={club.clubName}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
      </figure>

      {/* Content */}
      <div className="p-6">
        {/* Name + Category on same row, spaced apart */}
        <div className="flex items-center gap-2 mb-3">
          <h2 className="md:text-3xl text-2xl font-bold">{club.clubName}</h2>

          <span className="badge badge-accent text-white text-sm">
            {club.category}
          </span>
        </div>

        {/* Two Info Boxes (Fee + Location) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Membership Fee */}
          <div className="p-3 rounded-xl text-center border bg-gray-50">
            <p className="text-xs uppercase text-gray-500">Membership Fee</p>
            <p className="text-sm font-semibold">
              {club.membershipFee === 0 ? "Free" : `${club.membershipFee} BDT`}
            </p>
          </div>

          {/* Location */}
          <div className="p-3 bg-gray-50 rounded-xl text-center border flex flex-col items-center">
            <p className="text-xs uppercase text-gray-500">Location</p>
            <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
              <FaMapMarkerAlt className="text-gray-500" />
              {club.location}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-4">
        <Link to={`/club-details/${club._id}`}>
          <Button name="View Details" icon={FaInfoCircle}></Button>
        </Link>
      </div>
    </div>
  );
};

export default ClubCard;
