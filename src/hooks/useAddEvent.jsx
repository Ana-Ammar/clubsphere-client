import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "./useAxiosSecure";

export const useAddEvent = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (eventData) => {
      const res = await axiosSecure.post("/events", eventData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
      Swal.fire({
        icon: "success",
        title: "Event Created!",
        text: "Your event has been added successfully.",
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
};
