import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
const GoogleLoginBtn = () => {
  const { loginUserWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = () => {
    loginUserWithGoogle()
      .then((res) => {
        console.log(res, "token res:", res._tokenResponse.firstName);
        // Add user to database
        const userInfo = {
          email: res.user.email,
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        };
        axiosSecure.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Welcome to ClubsPhere!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        navigate(location.state || "/");
      })

      .catch((err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Please try again",
          showConfirmButton: false,
          timer: 1500,
          footer: `${err.message}`,
        });
      });
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="btn bg-gray-100 text-black border-[#e5e5e5] w-full flex justify-center items-center"
    >
      <FcGoogle size={24} />
      Continue with Google
    </button>
  );
};

export default GoogleLoginBtn;
