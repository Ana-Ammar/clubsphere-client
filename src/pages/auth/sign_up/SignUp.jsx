import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../../components/button/Button";
import { IoMdArrowRoundBack } from "react-icons/io";
import BackButton from "../../../components/back_button/BackButton";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <section className="md:min-h-screen w-full flex justify-center items-center p-4">
      <div className="w-full max-w-4xl md:h-[90vh] flex flex-col-reverse lg:flex-row items-center rounded-2xl shadow-xl border border-base-100 overflow-hidden">
        {/* LEFT — Signup Form */}
        <div className="flex-1 bg-base-100 rounded-t-2xl lg:rounded-l-2xl lg:rounded-t-none flex flex-col items-center justify-center space-y-6 p-6 w-full">
          <h1 className="text-3xl font-bold">Create Account</h1>

          <div className="w-full lg:w-9/12 space-y-3 relative">
            <form
              onSubmit={handleSubmit(handleSignUp)}
              className="flex flex-col gap-4"
            >
              <input
                type="name"
                {...register("displayName", { required: "Name is required" })}
                placeholder="Name"
                className="input-field "
              />
              {errors.displayName && (
                <p className="text-accent text-sm">
                  {errors.displayName.message}
                </p>
              )}

              <input
                type="photoUrl"
                {...register("photoUrl", { required: "PhotoUrl is required" })}
                placeholder="PhotoUrl"
                className="input-field "
              />
              {errors.photoUrl && (
                <p className="text-accent text-sm">{errors.photoUrl.message}</p>
              )}

              {/* Email */}
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="input-field "
              />
              {errors.email && (
                <p className="text-accent text-sm">{errors.email.message}</p>
              )}

              {/* Password */}
              <div className="relative w-full">
                <input
                  type={show ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="Password"
                  className="input-field"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute top-3 right-3 cursor-pointer text-gray-500 opacity-70 z-20"
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-accent text-sm">{errors.password.message}</p>
              )}

              {/* Submit Button */}
              <Button name={`Sign Up`}></Button>
            </form>
          </div>
        </div>

        {/* RIGHT — Welcome CTA */}
        <div className="flex-1 h-full w-full bg-linear-to-br from-secondary to-primary flex flex-col justify-center items-center space-y-4 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-black">
            <span className="glass rounded-4xl py-2 px-4">ClubSphere</span>
          </h1>
          <h1 className="text-4xl font-extrabold text-center lg:text-left">
            Welcome Back!
          </h1>
          <p className="text-center w-3/4 lg:w-full opacity-90 text-sm">
            Already have an account? Log in to continue your journey.
          </p>

          <BackButton name="Login Page" link="/login" />
          <BackButton name="Back" link="/" />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
