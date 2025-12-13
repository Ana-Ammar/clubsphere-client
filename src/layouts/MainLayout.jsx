import { Outlet, useNavigation } from "react-router";
import Footer from "../components/footer/Footer";
import LoadingSpinner from "../components/loading_spinner/LoadingSpinner";

const MainLayout = () => {
  const navigation = useNavigation();
  return (
    <div>
      {navigation.state === "loading" ? <LoadingSpinner /> : <Outlet />}
      <Footer />
    </div>
  );
};

export default MainLayout;
