import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../components/loading_spinner/LoadingSpinner";


const ManageUsers = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const looggedInUser = user || {};

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Mutation to change role
  const roleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/${id}/role`, { role });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire({
        icon: "success",
        title: "Role Updated!",
        text: "User role updated successfully.",
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error Updating",
        text: error.message,
      });
    },
  });

  // Handle role update
  const handleChangeRole = (id, role) => {

    Swal.fire({
      title: "Are you sure?",
      text: `Make this user a ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        roleMutation.mutate({ id, role });
      }
    });
  };

  if(isLoading) {
    <LoadingSpinner />
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Users</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((u, idx) => (
              <tr key={u._id} className="hover">
                <th>{idx + 1}</th>
                <td>{u?.displayName}</td>
                <td>{u?.email}</td>
                <td>
                  <span className="badge badge-neutral">{u?.role}</span>
                </td>
                <td>
                  {u?.createdAt
                    ? new Date(u?.createdAt).toLocaleDateString()
                    : "—"}
                </td>

                <td className="space-x-2 flex">
                  <button
                    className={`btn btn-xs btn-primary ${
                      (u.role === "admin" ||
                        looggedInUser.email === u?.email) &&
                      "btn-disabled"
                    }`}
                    onClick={() => handleChangeRole(u._id, "admin")}
                  >
                    Admin
                  </button>

                  <button
                    className={`btn btn-xs btn-warning ${
                      (u.role === "clubManager" ||
                        looggedInUser.email === u?.email) &&
                      "btn-disabled"
                    }`}
                    onClick={() => handleChangeRole(u._id, "clubManager")}
                  >
                   Club Manager
                  </button>

                  <button
                    className={`btn btn-xs btn-neutral  ${
                      (u.role === "member" ||
                        looggedInUser.email === u?.email) &&
                      "btn-disabled"
                    }`}
                    onClick={() => handleChangeRole(u?._id, "member")}
                  >
                  Member
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

export default ManageUsers;
