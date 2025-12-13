import LoadingSpinner from "../../components/loading_spinner/LoadingSpinner";
import useAxios from "../../hooks/useAxios";
import ClubCard from "./club_card/ClubCard";
import { useQuery } from "@tanstack/react-query";

const Clubs = () => {
  const axios = useAxios();
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axios.get("/clubs?status=approved");
      return res.data;
    },
  });
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="py-12 px-4 sm:px-6 lg:px-12">
        <h1 className="text-3xl font-bold text-center mb-8">Clubs</h1>

        <div className="grid grid-cols-1 gap-6">
          {clubs.map((club) => (
            <ClubCard key={club._id} club={club}></ClubCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clubs;
