import { NavLink } from "react-router";
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
          <section className="navbar w-full">
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
            <h1 className="flex-1 font-black text-2xl md:text-3xl flex items-center">
             <span className="bg-white/20 rounded-4xl py-2 px-4">ClubSphere</span>
            </h1>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal bg-white/20 rounded-4xl mr-2">
                {links}
              </ul>
            </div>
            <Profile />
          </section>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200  p-4" onClick={() =>
                  (document.getElementById("my-drawer-2").checked = false)
                }
              >
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
