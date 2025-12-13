import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaLayerGroup, FaInfoCircle } from "react-icons/fa";
import Button from "../../../components/button/Button";

const LatestClubs = () => {
  const axios = useAxios();
  const { data: clubs = [] } = useQuery({
    queryKey: ["home-clubs"],
    queryFn: async () => {
      const res = await axios.get("/latest-clubs");
      return res.data;
    },
  });

  return (
    <section className="py-16">
      {/* Page Headline */}
      <h2 className="text-3xl font-bold text-center mb-10">Featured Clubs</h2>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
        {clubs.map((club) => (
          <div
            key={club._id}
            className="card bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-2xl overflow-hidden transition-all duration-200"
          >
            {/* Banner Image */}
            <div className="w-full h-40 md:h-48 overflow-hidden">
              <img
                src={club.bannerImage || "/default-club.jpg"} // fallback image
                alt={club.clubName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card Content */}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{club.clubName}</h3>
              <p className="flex items-center gap-2 text-gray-600 mb-1">
                <FaMapMarkerAlt /> {club.location}
              </p>
              <p className="flex items-center gap-2 text-gray-600 mb-4">
                <FaLayerGroup /> {club.category}
              </p>
              <Link to={`/club-details/${club._id}`}>
                <Button name="View Details" icon={FaInfoCircle}></Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestClubs;
