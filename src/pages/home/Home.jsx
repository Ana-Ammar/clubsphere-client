import Banner from "../../components/banner/Banner";
import HowItWorks from "./how_it_works/HowItWorks";
import WhyJoin from "./why_join/WhyJoin";

const Home = () => {
    return (
        <div>
            <Banner />
            <HowItWorks />
            <WhyJoin />
        </div>
    );
};

export default Home;