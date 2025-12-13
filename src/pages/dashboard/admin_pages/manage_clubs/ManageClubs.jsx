import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import ClubState from "./club_state/ClubState";
import LoadingSpinner from "../../../../components/loading_spinner/LoadingSpinner";

const ManageClubs = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Fetch all clubs
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs");
      return res.data;
    },
  });

  // Mutation to update status
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/clubs/${id}/status`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["clubs"]);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Club status updated successfully",
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

  // Handle approve/reject
  const handleStatus = (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${status} this club?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${status}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        statusMutation.mutate({ id, status });
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Clubs</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Club Name</th>
              <th>Manager Email</th>
              <th>Status</th>
              <th>Membership Fee</th>
              <th>Stats</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {clubs?.map((club, idx) => (
              <tr key={club._id} className="hover">
                <th>{idx + 1}</th>
                <td>{club.clubName}</td>
                <td>{club.managerEmail}</td>
                <td>
                  <span
                    className={`badge ${
                      club.status === "approved"
                        ? "badge-success"
                        : club.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {club.status || "pending"}
                  </span>
                </td>
                <td>${club.membershipFee}</td>
                <td>
                  <ClubState clubId={club._id} />
                </td>
                <td className="flex space-x-2">
                  {club.status === "pending" && (
                    <>
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() => handleStatus(club._id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleStatus(club._id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClubs;
