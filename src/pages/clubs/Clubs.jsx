import { motion } from "framer-motion";
import LoadingSpinner from "../../components/loading_spinner/LoadingSpinner";
import useAxios from "../../hooks/useAxios";
import ClubCard from "./club_card/ClubCard";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Clubs = () => {
  const axios = useAxios();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  useEffect(() => {
  const handler = setTimeout(() => {
    if (search.length >= 3 || search.length === 0) {
      setDebouncedSearch(search);
    }
  }, 500);
  return () => clearTimeout(handler);
}, [search]);


  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs", category, debouncedSearch],
    queryFn: async () => {
      const res = await axios.get(`/clubs?status=approved&search=${debouncedSearch}&category=${category}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen overflow-hidden">
      <motion.div
        variants={sectionVariants}
        whileInView="visible"
        className="py-12 px-4 sm:px-6 lg:px-12"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Clubs</h1>

        <div className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl mb-8">
       
             <input
              type="text"
              className="input-field w-full md:w-1/2"
              placeholder="Search club name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          
        
          <select
            className="input-field select w-full md:w-1/2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Sports">Sports</option>
            <option value="Tech">Tech</option>
            <option value="Photography">Photography</option>
            <option value="Anime">Anime</option>
            <option value="Business">Business</option>
            <option value="Art">Art</option>
          </select>


        </div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 gap-6"
        >
          {clubs.map((club) => (
            <ClubCard key={club._id} club={club}></ClubCard>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Clubs;
