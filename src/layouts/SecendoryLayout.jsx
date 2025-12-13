import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import LoadingSpinner from "../components/loading_spinner/LoadingSpinner";

const SecendoryLayout = () => {
  const navigation = useNavigation();
  return (
    <div>
      <Navbar />
      {navigation.state === "loading" ? <LoadingSpinner /> : <Outlet />}

      <Footer />
    </div>
  );
};

export default SecendoryLayout;
