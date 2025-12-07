import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";

const AuthLayout = () => {
    return (
        <div>

            <Outlet />
        </div>
    );
};

export default AuthLayout;