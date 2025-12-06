import { Link, NavLink } from "react-router";
import Profile from "./loginAndProfile/Profile";
// import logo from "../../../../../../Downloads/logo.png";

const Navbar = () => {
  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/clubs">Clubs</NavLink></li>
      <li><NavLink to="/events">Events</NavLink></li>
    </>
  );
  return (
    <div>
      <div className="drawer">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar w-full md:px-8 px-4">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <h1 className="flex-1 font-bold text-2xl flex items-center">
              ClubsPhere
            </h1>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">
                {links}
              </ul>
            </div>
            <Profile />
          </div>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4" onClick={() =>
                  (document.getElementById("my-drawer-2").checked = false)
                }
              >
            {/* Sidebar content here */}
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
