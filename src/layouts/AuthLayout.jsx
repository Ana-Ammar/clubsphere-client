import { Outlet, useNavigation } from "react-router";
import LoadingSpinner from "../components/loading_spinner/LoadingSpinner";

const AuthLayout = () => {
  const navigation = useNavigation();
  return (
    <div>
      {navigation.state === "loading" ? <LoadingSpinner /> : <Outlet />}
    </div>
  );
};

export default AuthLayout;
