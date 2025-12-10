import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiUsers, FiCalendar } from "react-icons/fi";

const ClubState = ({ clubId }) => {
  const axiosSecure = useAxiosSecure();
  const { data: members = [] } = useQuery({
    queryKey: ["members", clubId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/memberships?clubId=${clubId}`);
      return res.data;
    },
  });

  const { data: events = [] } = useQuery({
    queryKey: ["clubStats", clubId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events?clubId=${clubId}`);
      return res.data;
    },
  });

  return (
    <div className="flex items-center gap-4">
      <span className="flex items-center gap-1 text-sm">
        <FiUsers /> {members?.length}
      </span>
      <span className="flex items-center gap-1 text-sm">
        <FiCalendar /> {events?.length}
      </span>
    </div>
  );
};

export default ClubState;
