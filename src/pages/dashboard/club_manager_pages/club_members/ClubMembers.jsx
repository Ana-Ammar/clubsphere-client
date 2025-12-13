import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FiUserCheck, FiUserX } from "react-icons/fi";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/loading_spinner/LoadingSpinner";

const ClubMembers = () => {
  const { user } = useAuth();
  const managerEmail = user?.email;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedClubId, setSelectedClubId] = useState(null);

  // Fetch all clubs managed by this manager
  const { data: clubs = [], isLoading: loadingClubs } = useQuery({
    queryKey: ["myClubs", managerEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs?managerEmail=${managerEmail}`);
      return res.data;
    },
  });

  // Fetch members for selected club
  const { data: members = [], isLoading: loadingMembers } = useQuery({
    queryKey: ["members", selectedClubId],
    queryFn: async () => {
      if (!selectedClubId) return [];
      const res = await axiosSecure.get(
        `/memberships?clubId=${selectedClubId}`
      );
      return res.data;
    },
    enabled: !!selectedClubId,
  });

  // Mutation to set membership expired
  const expireMutation = useMutation({
    mutationFn: async ({ membershipId, status }) => {
      const res = await axiosSecure.patch(
        `/memberships/${membershipId}/status`,
        { status }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["members", selectedClubId]);
      Swal.fire({
        icon: "success",
        title: "Membership Expired",
        text: "The membership has been set to expired.",
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    },
  });

  const handleSetExpired = (membershipId, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to expire this membership?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, expire it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        expireMutation.mutate({ membershipId, status });
      }
    });
  };

  if (loadingMembers || loadingClubs) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Club Members</h2>

      {/* Select Club */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Club:</label>
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedClubId || ""}
          onChange={(e) => setSelectedClubId(e.target.value)}
        >
          <option value="">-- Select a Club --</option>
          {clubs.map((club) => (
            <option key={club._id} value={club._id}>
              {club.clubName}
            </option>
          ))}
        </select>
      </div>

      {/* Members Table */}
      {loadingMembers ? (
        <p>Loading members...</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, idx) => (
                <tr key={m._id} className="hover">
                  <th>{idx + 1}</th>
                  <td>{m.userEmail}</td>
                  <td>
                    <span
                      className={`badge ${
                        m.status === "active" ? "badge-success" : "badge-error"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td>
                    {m.joinedAt
                      ? new Date(m.joinedAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="space-x-2 flex">
                    {m.status === "active" && (
                      <button
                        className="btn btn-xs btn-warning flex items-center gap-1"
                        onClick={() => handleSetExpired(m._id, "expired")}
                      >
                        <FiUserX /> Expire
                      </button>
                    )}
                    {m.status === "expired" && (
                      <span className="flex items-center gap-1 text-gray-400">
                        <FiUserCheck /> Expired
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClubMembers;
