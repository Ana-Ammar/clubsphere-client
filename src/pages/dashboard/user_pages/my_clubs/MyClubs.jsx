import { useQuery } from "@tanstack/react-query";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Button from "../../../../components/button/Button";
import LoadingSpinner from "../../../../components/loading_spinner/LoadingSpinner";

const MyClub = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const { data, isLoading } = useQuery({
    queryKey: ["myClubs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/my-clubs/${user?.email}`);
      return res.data;
    },
  });


  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        You have not joined any club yet.
      </div>
    );
  }

  if (isLoading) return <LoadingSpinner />;
  

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Clubs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((club) => (
          <div
            key={club.clubId}
            className="card bg-base-100 shadow-lg border border-gray-200 rounded-xl"
          >
            <div className="card-body">
              <h2 className="card-title text-xl font-bold">{club.clubName}</h2>

              <div className="flex items-center text-gray-600 gap-2">
                <FaMapMarkerAlt /> {club.location}
              </div>

              <div className="mt-2">
                <span
                  className={`badge ${
                    club.status === "active" ? "badge-success" : "badge-warning"
                  }`}
                >
                  {club.status.toUpperCase()}
                </span>
              </div>

              {club.expiryDate && (
                <p className="text-sm text-gray-500 mt-1">
                  Expiry: {new Date(club.expiryDate).toLocaleDateString()}
                </p>
              )}

              <div className="card-actions justify-end mt-4">
                <Link to={`/club-details/${club.clubId}`}>
                  <Button name="View Details"/>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClub;
