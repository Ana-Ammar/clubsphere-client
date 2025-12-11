import { Link, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import { PiDotsThreeCircleVerticalLight } from "react-icons/pi";
import { LiaUsersCogSolid } from "react-icons/lia";
import { MdManageHistory } from "react-icons/md";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full justify-between px-4 border-b border-b-base-300">
          <h1 className="font-black text-2xl md:text-3xl">
            <span className="glass rounded-4xl py-2 px-4">ClubSphere</span>
          </h1>

          <div className="md:flex justify-center items-center gap-2 glass rounded-4xl py-2 px-4">
            <div className="text-right text-sm">
              <h4>{user?.displayName}</h4>
              <p className="text-black/70">{user?.email}</p>
            </div>
            <img src={user?.photoURL} className="w-10 rounded-full" />
          </div>
        </nav>

        {/* Page content here */}
        <div className="p-4">
        <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-56">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="m-4 cursor-pointer transition-transform duration-200 hover:scale-125 mx-auto"
          >
            <PiDotsThreeCircleVerticalLight size={32} />
          </label>
          <ul className="menu w-full grow">

            <li>
              <Link
              to="admin-overview"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            <li>
              <Link
              to="manage-users"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage Users">
                <LiaUsersCogSolid  size={24}/>
                <span className="is-drawer-close:hidden">Manage Users</span>
              </Link>
            </li>

             <li>
              <Link
              to="manage-clubs"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manage Clubs">
               <MdManageHistory size={24} />
                <span className="is-drawer-close:hidden">Manage Clubs</span>
              </Link>
            </li>


          {/* Manager Pages */}
           <li>
              <Link
              to="manager-overview"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Manager Overview"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Manager Overview</span>
              </Link>
            </li>


             <li>
              <Link
              to="manager-clubs"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Clubs">
               <MdManageHistory size={24} />
                <span className="is-drawer-close:hidden">My Clubs</span>
              </Link>
            </li>


             <li>
              <Link
              to="club-members"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Clubs">
               <MdManageHistory size={24} />
                <span className="is-drawer-close:hidden">My Clubs</span>
              </Link>
            </li>

              <li>
              <Link
              to="event-management"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Club Events">
               <MdManageHistory size={24} />
                <span className="is-drawer-close:hidden">My Club Events</span>
              </Link>
            </li>

            <li>
              <Link
              to="event-registration"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Events Registrations">
               <MdManageHistory size={24} />
                <span className="is-drawer-close:hidden">My Events Registrations</span>
              </Link>
            </li>

          </ul>
          <div className="w-10/12 mx-auto my-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
