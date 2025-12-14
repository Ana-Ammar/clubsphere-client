import { Link, Outlet, useNavigation } from "react-router";
import useAuth from "../hooks/useAuth";
import { BsMenuButton } from "react-icons/bs";
import { LiaUsersCogSolid } from "react-icons/lia";
import { MdAppRegistration, MdManageHistory, MdPayment } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import useRole from "../hooks/useRole";
import { SiEventstore, SiMyspace } from "react-icons/si";
import BackButton from "../components/back_button/BackButton";
import LoadingSpinner from "../components/loading_spinner/LoadingSpinner";

const Dashboard = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const navigation = useNavigation();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full justify-between px-4 border-b border-b-base-300">
          <div className="flex justify-between items-center gap-4">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="m-4 cursor-pointer transition-transform duration-200 hover:scale-125 mx-auto"
            >
              <BsMenuButton size={28} className="text-gray-500" />
            </label>
            <Link to="/">
              <h1 className="font-black text-2xl">
                <span className="glass rounded-4xl py-2 px-4">ClubSphere</span>
              </h1>
            </Link>
          </div>

          <div className="glass rounded-4xl p-1 px-4 text-sm hidden md:flex flex-col">
            <h4>{user?.displayName}</h4>
            <p className="text-black/70">{user?.email}</p>
          </div>
        </nav>

        {/* Page content here */}
        <div className="p-4">
          {navigation.state === "loading" ? <LoadingSpinner /> : <Outlet />}
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-56">
          <div className="glass rounded-4xl p-1 px-4 text-sm md:hidden m-4">
            <h4>{user?.displayName}</h4>
            <p className="text-black/70">{user?.email}</p>
          </div>

          <ul className="menu w-full grow">
            {role.role === "admin" && (
              <>
                <li>
                  <Link
                    to="admin-overview"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Admin Overview"
                  >
                    <GrOverview size={24} />
                    <span className="is-drawer-close:hidden">
                      Admin Overview
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="manage-users"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Users"
                  >
                    <LiaUsersCogSolid size={24} />
                    <span className="is-drawer-close:hidden">Manage Users</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="manage-clubs"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Clubs"
                  >
                    <MdManageHistory size={24} />
                    <span className="is-drawer-close:hidden">Manage Clubs</span>
                  </Link>
                </li>

                 <li>
                  <Link
                    to="all-payments"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Payments"
                  >
                    <MdPayment size={24} />
                    <span className="is-drawer-close:hidden">
                      All Payments
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* Manager Pages */}
            {role.role === "clubManager" && (
              <>
                <li>
                  <Link
                    to="manager-overview"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manager Overview"
                  >
                    <GrOverview size={24} />
                    <span className="is-drawer-close:hidden">
                      Manager Overview
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="manager-clubs"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Clubs"
                  >
                    <MdManageHistory size={24} />
                    <span className="is-drawer-close:hidden">My Clubs</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="club-members"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Club Members"
                  >
                    <SiMyspace size={24} />
                    <span className="is-drawer-close:hidden">Club Members</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="event-management"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Event Management"
                  >
                    <SiEventstore size={24} />
                    <span className="is-drawer-close:hidden">
                      Event Management
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="event-registration"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Events Registrations"
                  >
                    <MdAppRegistration size={24} />
                    <span className="is-drawer-close:hidden">
                      Events Registrations
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="club-payments"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Club Payments"
                  >
                    <MdPayment size={24} />
                    <span className="is-drawer-close:hidden">
                      Club Payments
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* member Pages */}
            {role.role === "member" && (
              <>
                <li>
                  <Link
                    to="member-overview"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Member Overview"
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
                    <span className="is-drawer-close:hidden">
                      Manager Overview
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="my-clubs"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Clubs"
                  >
                    <SiMyspace size={24} />
                    <span className="is-drawer-close:hidden">My Clubs</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="my-events"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Events"
                  >
                    <SiEventstore size={24} />
                    <span className="is-drawer-close:hidden">My Events</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="w-10/12 mx-auto my-4">
            <span className="is-drawer-close:hidden">
              <BackButton name="Back to Home" color="black" link="/" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
