import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FiEdit, FiTrash2, FiPlus, FiCalendar } from "react-icons/fi";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { Link } from "react-router";
import Button from "../../../../components/button/Button";
import EditEvent from "./edit_event/EditEvent";
import Swal from "sweetalert2";

const EventManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState();
  const { user } = useAuth();
  const [selectedClub, setSelectedClub] = useState("");
  const queryClient = useQueryClient();

  // Fetch all clubs managed by this manager
  const { data: clubs = [] } = useQuery({
    queryKey: ["myClubs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs?managerEmail=${user?.email}`);
      return res.data;
    },
  });

  // Fetch events based on selected club
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", selectedClub],
    queryFn: async () => {
      if (!selectedClub) return [];
      const res = await axiosSecure.get(`/events?clubId=${selectedClub}`);
      return res.data;
    },
    enabled: !!selectedClub,
  });

  // Delete event mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/events/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      Swal.fire("Deleted!", "Your item has been deleted.", "success");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (!clubs?.length) {
    return <p className="text-center py-10">No clubs found.</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-2">
        {" "}
        Manage Events
      </h2>
      {/* Select Club */}
      <div className="flex items-center justify-between gap-4">
        <select
          className="select select-bordered w-full max-w-sm"
          value={selectedClub}
          onChange={(e) => setSelectedClub(e.target.value)}
        >
          <option value="">Select a Club</option>
          {clubs.map((club) => (
            <option value={club._id} key={club._id}>
              {club.clubName}
            </option>
          ))}
        </select>

        {/* Add Club Button */}
        {selectedClub && (
          <Link to={`/dashboard/add-event-form/${selectedClub}`}>
            <Button icon={FiPlus} name="Add Event" />
          </Link>
        )}
      </div>
      {/* Events Table */}
      {isLoading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p>No events available for this club.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base">
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Location</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {events.map((e) => (
                <tr key={e._id}>
                  <td>{e.title}</td>
                  <td>
                    {e.createdAt
                      ? new Date(e.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{e.location}</td>
                  <td>
                    <span className="badge badge-primary">
                      {e.status ?? "active"}
                    </span>
                  </td>

                  <td className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setIsOpen(true)}
                      className="btn btn-sm btn-info"
                    >
                      <FiEdit />
                    </button>
                    <EditEvent
                      setIsOpen={setIsOpen}
                      isOpen={isOpen}
                      event={e}
                    />
                    <button
                      onClick={() => handleDelete(e._id)}
                      className="btn btn-sm btn-error"
                    >
                      <FiTrash2 />
                    </button>
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

export default EventManagement;
