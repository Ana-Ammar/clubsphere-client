import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "./useAxiosSecure";

const useAddClub = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Mutation
  const mutation = useMutation({
    mutationFn: async (clubData) => {
      const res = await axiosSecure.post("/clubs", clubData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myClubs"]);

      Swal.fire({
        icon: "success",
        title: "Club Added!",
        text: `Your club has been added successfully.`,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Failed to Add Club",
        text: error.message,
      });
    },
  });

  return mutation;
};

export default useAddClub;
