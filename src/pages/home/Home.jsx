import Banner from "../../components/banner/Banner";
import HowItWorks from "./how_it_works/HowItWorks";
import LatestClubs from "./latest_clubs/LatestClubs";
import WhyJoin from "./why_join/WhyJoin";

const Home = () => {
    return (
        <div className="overflow-x-hidden">
            <Banner />
            <LatestClubs />
            <HowItWorks />
            <WhyJoin />
        </div>
    );
};

export default Home;