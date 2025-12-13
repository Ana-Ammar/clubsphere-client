import { useQuery } from "@tanstack/react-query";
import { FiEye, FiEdit, FiPlus } from "react-icons/fi";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { useState } from "react";
import EditClub from "./edit_club/EditClub";
import LoadingSpinner from "../../../../components/loading_spinner/LoadingSpinner";

const MyClubs = () => {
  const [isOpen, setIsOpen] = useState();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["myClubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs?managerEmail=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold">My Clubs</h2>

        {/* Add Club Button */}
        <Link
          to="/dashboard/add-club"
          className="btn btn-primary flex items-center gap-2"
        >
          <FiPlus /> Add Club
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-lg border border-base-300">
        <table className="table w-full">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>Club Name</th>
              <th>Category</th>
              <th>Location</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clubs.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-5 text-base-content">
                  No clubs found.
                </td>
              </tr>
            )}

            {clubs.map((club, index) => (
              <tr key={club._id} className="hover">
                <td>{index + 1}</td>
                <td className="font-medium">{club.clubName}</td>
                <td>{club.category || "N/A"}</td>
                <td>{club.location || "N/A"}</td>

                <td className="flex items-center gap-3 justify-center">
                  {/* View Button */}
                  <Link
                    to={`/club-details/${club._id}`}
                    className="btn btn-sm btn-info text-white flex items-center gap-1"
                  >
                    <FiEye size={16} /> View
                  </Link>

                  {/* Edit Button */}
                  <button
                    onClick={() => setIsOpen(true)}
                    className="btn btn-sm btn-warning text-white flex items-center gap-1"
                  >
                    <EditClub
                      club={club}
                      setIsOpen={setIsOpen}
                      isOpen={isOpen}
                    />
                    <FiEdit size={16} /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClubs;
