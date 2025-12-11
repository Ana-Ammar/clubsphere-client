import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import BackButton from "../../../../../components/back_button/BackButton";
import Button from "../../../../../components/button/Button";

const EditClub = ({ isOpen, setIsOpen, club }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      clubName: club?.clubName || "",
      description: club?.description || "",
      location: club?.location || "",
      membershipFee: club?.membershipFee || 0,
      category: club?.category || "",
      bannerImage: club?.bannerImage || "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/clubs/${club._id}`, updatedData);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["myClubs"])
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `${data.clubName} has been updated successfully.`,
      });
      reset(); 
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    },
  });

   const onSubmit = (data) => {
    updateMutation.mutate(data);
  };
  return (
    <>
      <Dialog
        open={!!isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border border-gray-200 rounded-2xl bg-white p-6">
            <DialogTitle className="font-bold text-center text-2xl">Update Club Info</DialogTitle>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 p-4 bg-base-100 shadow rounded-lg"
            >
              {/* Club Name */}
              <input
                {...register("clubName", { required: true })}
                className="input-field"
                placeholder="Club Name"
              />

              {/* Description */}
              <textarea
                {...register("description")}
                className="input-field"
                placeholder="Description"
              />

              {/* Location */}
              <input
                {...register("location")}
                className="input-field"
                placeholder="Location"
              />

              {/* Membership Fee */}
              <input
                type="number"
                {...register("membershipFee")}
                className="input-field"
                placeholder="Membership Fee"
              />

              {/* Category */}
              <input
                {...register("category")}
                className="input-field"
                placeholder="Category"
              />

              {/* Banner Image */}
              <input
                {...register("bannerImage")}
                className="input-field"
                placeholder="Banner Image URL"
              />

              {/* Submit Button */}
              <Button name="Update Club Info"></Button>
            </form>
            <div className="flex gap-4">
              <BackButton name="Back" color="black" handleBtn={() => setIsOpen(false)}></BackButton>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default EditClub;
