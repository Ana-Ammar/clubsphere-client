import { motion } from "framer-motion";
import Banner from "../../components/banner/Banner";
import HowItWorks from "./how_it_works/HowItWorks";
import LatestClubs from "./latest_clubs/LatestClubs";
import WhyJoin from "./why_join/WhyJoin";

const Home = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };
  return (
    <div className="overflow-hidden">
      <div>
        <Banner />
      </div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
      >
        <LatestClubs />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
      >
        <HowItWorks />
      </motion.div>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
      >
        <WhyJoin />
      </motion.div>
    </div>
  );
};

export default Home;
