import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import Button from "../../../components/button/Button";
import BackButton from "../../../components/back_button/BackButton";
import { useForm } from "react-hook-form";
import GoogleLoginBtn from "../social_button/GoogleLoginBtn";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const [show, setShow] = useState(false);
  const { signInWithEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signInWithEmail(data.email, data.password)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Welcome Back!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state || "/");
      })
      .catch((err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something went wrong",
          footer: `${err.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center p-4">
      <div className="w-full max-w-4xl md:h-[90vh] flex flex-col lg:flex-row items-center rounded-2xl shadow-xl border border-base-100 overflow-hidden">
        {/* LEFT — Welcome CTA */}
        <div className="flex-1 bg-linear-to-bl from-accent to-primary lg:h-full lg:flex-1 flex flex-col justify-center items-center space-y-4 p-6 text-white">
          <h1 className="font-black text-2xl md:text-3xl">
            <span className="glass rounded-4xl py-2 px-4">ClubSphere</span>
          </h1>

          <h1 className="font-extrabold text-4xl text-center lg:text-left">
            Welcome Back!
          </h1>
          <p className="text-center w-3/4 lg:w-full opacity-90 text-sm">
            Enter your details and continue your journey with ClubSphere.
          </p>
          <BackButton name="Create Account" link="/sign-up" />
          <BackButton name="Back" link="/" />
        </div>

        {/* RIGHT — Login Form */}
        <div className="flex-1 bg-base-100 rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none flex flex-col items-center justify-center space-y-6 p-6 w-full">
          <h1 className="text-3xl font-bold">Login</h1>

          <div className="w-full lg:w-9/12 space-y-3 relative">
            <form
              onSubmit={handleSubmit(handleLogin)}
              className="flex flex-col gap-4"
            >
              <div>
                <input
                  type="email"
                  className="input-field"
                  placeholder="Email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-accent text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="w-full relative">
                <input
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="input-field"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-accent text-sm">
                    {errors.password.message}
                  </p>
                )}

                <span
                  onClick={() => setShow(!show)}
                  className="absolute top-3 right-3 cursor-pointer text-gray-500 opacity-70 z-20"
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="w-full flex justify-end">
                <a className="text-[#8f9aa3] text-sm hover:text-acc underline cursor-pointer">
                  Forgot password?
                </a>
              </div>

              <Button name={`Login`}></Button>
            </form>
            <div className="divider">Or</div>
            <GoogleLoginBtn></GoogleLoginBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
