import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Button from "../../button/Button";
import { Link } from "react-router";

const Profile = () => {
  const { user, logOut } = useAuth();
  const links = (
    <>
      <li>
        <Link>Dashboard</Link>
      </li>
      <li>
        <Link>Be a Manager</Link>
      </li>
      <li>
        <Link>Create Club</Link>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "See you soon!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="drawer drawer-end w-fit">
      <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-5" className="">
          {user ? (
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
              data-tip={user?.displayName}
            >
              <div className="w-16 rounded-full border glass p-1">
                <img
                  className="rounded-full w-full"
                  alt="User Image"
                  src={
                    user?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
          ) : (
            <Link to="/login">
              <Button name={`Login`} />
            </Link>
          )}
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-5"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul
          className="menu bg-base-100/80 min-h-full space-y-2 w-50 p-4"
          onClick={() => {
            document.getElementById("my-drawer-5").checked = false;
          }}
        >
          {links}
          <Button handleBtn={handleLogOut} name="Log Out"></Button>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
