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
import AdminOverview from "../pages/dashboard/admin_pages/admin_overview/AdminOverview";
import ManageUsers from "../pages/dashboard/admin_pages/manage_users/ManageUsers";
import ManageClubs from "../pages/dashboard/admin_pages/manage_clubs/ManageClubs";
import ManagerOverview from "../pages/dashboard/club_manager_pages/manager_overview/ManagerOverview";
import MyClubs from "../pages/dashboard/club_manager_pages/my_clubs/MyClubs";
import AddClub from "../pages/dashboard/club_manager_pages/my_clubs/add_club/AddClub";
import ClubMembers from "../pages/dashboard/club_manager_pages/club_members/ClubMembers";
import EventManagement from "../pages/dashboard/club_manager_pages/event_management/EventManagement";
import AddEventForm from "../pages/dashboard/club_manager_pages/event_management/add_event_form/AddEventForm";
import EventRegistrations from "../pages/dashboard/club_manager_pages/event_registration/EventRegistration";
import MemberOverview from "../pages/dashboard/user_pages/member_overview/MemberOverview";
import MyClub from "../pages/dashboard/user_pages/my_clubs/MyClubs";
import MyEvents from "../pages/dashboard/user_pages/my_events/MyEvents";
import PaymentSuccess from "../pages/dashboard/payment/PaymentSuccess";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";
import MemberRoute from "./MemberRoute";
import ErrorPage from "../pages/error_page/ErrorPage";
import ClubPayments from "../pages/dashboard/club_manager_pages/club_payments/ClubPayments";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<ErrorPage />,
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
    errorElement:<ErrorPage />,
    children: [
      {
        path: "/clubs",
        element: <Clubs />,
      },
      {
        path: "/club-details/:id",
        element: (
          <PrivateRoute>
            <ClubDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/event-details/:id",
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    errorElement:<ErrorPage />,
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
    errorElement:<ErrorPage />,
    children: [
      {
        path: "admin-overview",
        element: (
          <AdminRoute>
            <AdminOverview />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-clubs",
        element: (
          <AdminRoute>
            <ManageClubs />
          </AdminRoute>
        ),
      },
      {
        path: "manager-overview",
        element: (
          <ManagerRoute>
            <ManagerOverview />
          </ManagerRoute>
        ),
      },
      {
        path: "manager-clubs",
        element: (
          <ManagerRoute>
            <MyClubs />
          </ManagerRoute>
        ),
      },
      {
        path: "add-club",
        element: (
          <ManagerRoute>
            <AddClub />
          </ManagerRoute>
        ),
      },
      {
        path: "club-members",
        element: (
          <ManagerRoute>
            <ClubMembers />
          </ManagerRoute>
        ),
      },
      {
        path: "event-management",
        element: (
          <ManagerRoute>
            <EventManagement />
          </ManagerRoute>
        ),
      },
      {
        path: "add-event-form/:id",
        element: (
          <ManagerRoute>
            <AddEventForm />
          </ManagerRoute>
        ),
      },
      {
        path: "event-registration",
        element: (
          <ManagerRoute>
            <EventRegistrations />
          </ManagerRoute>
        ),
      },
      {
        path: "club-payments",
        element: (
          <ManagerRoute>
            <ClubPayments />
          </ManagerRoute>
        ),
      },
      {
        path: "member-overview",
        element: (
          <MemberRoute>
            <MemberOverview />
          </MemberRoute>
        ),
      },
      {
        path: "my-clubs",
        element: (
          <MemberRoute>
            <MyClub />
          </MemberRoute>
        ),
      },
      {
        path: "my-events",
        element: (
          <MemberRoute>
            <MyEvents />
          </MemberRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <MemberRoute>
            <PaymentSuccess />
          </MemberRoute>
        ),
      },
    ],
  },
]);
