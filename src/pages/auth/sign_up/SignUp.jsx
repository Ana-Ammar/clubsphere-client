import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../../components/button/Button";
import BackButton from "../../../components/back_button/BackButton";
import GoogleLoginBtn from "../social_button/GoogleLoginBtn";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const { createUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const photoFile = useWatch({ control, name: "photo" })?.[0]?.name;

  const handleSignUp = (data) => {
    const uploadedImg = data.photo[0];
    createUser(data.email, data.password)
      .then((res) => {
        // upload image
        const formData = new FormData();
        formData.append("image", uploadedImg);

        // image post to imagebb and link create
        const image_api = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios.post(image_api, formData).then((res) => {
            
          // Add user to database
          const userInfo = {
            email: data.email,
            displayName: data.displayName,
            photoURL: res.data.data.url,
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              // console.log("user created in the database");
            }
          });

          // update user profile
          const updatedData = {
            displayName: data.displayName,
            photoURL: res.data.data.url,
          };
          updateUserProfile(updatedData)
            .then(() => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Account created successfully!",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(location.state || "/");
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
        });
      })
      .catch((err) => {
        // console.log("in Create user", err);
      });
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
              <div>
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
              </div>

              <div className="relative">
                <label className="block bg-white border border-[#d9dceb] rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#8e94f2] text-sm text-accent-content cursor-pointer">
                  {photoFile || "Upload Photo"}
                  <input
                    type="file"
                    {...register("photo", { required: "Photo is required" })}
                    className="hidden"
                  />
                </label>
                {errors.photo && (
                  <p className="text-accent text-sm">{errors.photo.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Email"
                  className="input-field "
                />
                {errors.email && (
                  <p className="text-accent text-sm">{errors.email.message}</p>
                )}
              </div>

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
                {errors.password && (
                  <p className="text-accent text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button name={`Sign Up`}></Button>
            </form>
            <div className="divider">Or</div>
            <GoogleLoginBtn></GoogleLoginBtn>
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
