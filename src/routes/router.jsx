import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Clubs from "../pages/clubs/Clubs";
import Events from "../pages/events/Events";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/login/Login";
import SignUp from "../pages/auth/sign_up/SignUp";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
               path: "/clubs",
               element: <Clubs /> 
            },
            {
                path: "/events",
                element: <Events />
            }
        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path:"/sign-up",
                element: <SignUp />
            }
        ]
    }
])