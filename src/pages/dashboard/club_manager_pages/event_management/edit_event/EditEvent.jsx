import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Button from "../../../../../components/button/Button";
import BackButton from "../../../../../components/back_button/BackButton";

const EditEvent = ({ isOpen, setIsOpen, event }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      date: event?.date || "",
      location: event?.location || "",
      isPaid: event?.isPaid || false,
      eventFee: event?.eventFee || 0,
      maxAttendees: event?.maxAttendees || 0,
    },
  });

   const updateMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(`/events/${event._id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Event info updated successfully",
      });
      setIsOpen(false);
      reset();
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    },
  });

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  return (
    <Dialog
      open={!!isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border border-gray-200 rounded-2xl bg-white p-6">
          <DialogTitle className="font-bold text-center text-2xl">
            Update Event
          </DialogTitle>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-4 bg-base-100 shadow rounded-lg"
          >
            {/* Title */}
            <input
              {...register("title", { required: true })}
              className="input-field"
              placeholder="Event Title"
            />

            {/* Description */}
            <textarea
              {...register("description")}
              className="input-field"
              placeholder="Description"
            />

            {/* Date */}
            <input
              type="datetime-local"
              {...register("date", { required: true })}
              className="input-field"
            />

            {/* Location */}
            <input
              {...register("location")}
              className="input-field"
              placeholder="Location"
            />

            {/* Paid Event */}
            <select {...register("isPaid")} className="input-field">
              <option value={true}>Paid</option>
              <option value={false}>Free</option>
            </select>

            {/* Event Fee */}
            <input
              type="number"
              {...register("eventFee")}
              className="input-field"
              placeholder="Event Fee"
            />

            {/* Max Attendees */}
            <input
              type="number"
              {...register("maxAttendees")}
              className="input-field"
              placeholder="Max Attendees"
            />

            <Button name="Update Event" />
          </form>

          <div className="flex gap-4">
            <BackButton
              name="Back"
              color="black"
              handleBtn={() => setIsOpen(false)}
            />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default EditEvent;
