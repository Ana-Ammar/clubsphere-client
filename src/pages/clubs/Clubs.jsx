import { motion } from "framer-motion";
import LoadingSpinner from "../../components/loading_spinner/LoadingSpinner";
import useAxios from "../../hooks/useAxios";
import ClubCard from "./club_card/ClubCard";
import { useQuery } from "@tanstack/react-query";

const Clubs = () => {
  const axios = useAxios();
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axios.get("/clubs?status=approved");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen overflow-hidden">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        className="py-12 px-4 sm:px-6 lg:px-12"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Clubs</h1>

        <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        className="grid grid-cols-1 gap-6">
          {clubs.map((club) => (
            <ClubCard key={club._id} club={club}></ClubCard>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Clubs;
