import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Clubs from "../pages/clubs/Clubs";
import Events from "../pages/events/Events";

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
    }
])