import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Clubs from "../pages/clubs/Clubs";
import Events from "../pages/events/Events";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/login/Login";
import SignUp from "../pages/auth/sign_up/SignUp";
import Dashboard from "../layouts/Dashboard";
import SecendoryLayout from "../layouts/SecendoryLayout";
import ClubDetails from "../pages/clubs/club_details/ClubDetails";
import EventDetails from "../pages/events/event_details/EventDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <SecendoryLayout />,
    children: [
      {
        path: "/clubs",
        element: <Clubs />,
      },
      {
        path: "/club-details/:id",
        element: <ClubDetails />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/event-details/:id",
        element: <EventDetails />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
