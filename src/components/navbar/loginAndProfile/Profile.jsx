
import { useState } from "react";
import Button from "../../button/Button";
import { Link } from "react-router";

const Profile = () => {
    const [user] = useState()
    const links = <>
      <li><Link>Dashboard</Link></li>
      <li><Link>Be a Manager</Link></li>
      <li><Link>Create Club</Link></li>
    </>
  return (
    <div className="drawer drawer-end w-fit">
      <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-5" className="">
         {
            user ?
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-16 rounded-full border glass p-1">
          <img
          className="rounded-full w-full"
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
         </div>
         :  <Link><Button name={`Login`}/></Link>
         }
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-5"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-100/80 min-h-full w-50 p-4" onClick={() => {document.getElementById('my-drawer-5').checked = false}}>
        {links}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
