import { Link } from "react-router";
import errorImg from "../../assets/error_page.png"
import { MdOutlineArrowBack } from "react-icons/md";
import BackButton from "../../components/back_button/BackButton";
import Navbar from "../../components/navbar/Navbar";



const ErrorPage = () => {

  return (
    <div className="flex flex-col space-y-8 h-screen">
    <Navbar />
      <div className="mx-auto mt-16">
        <img src={errorImg} 
        className="w-80 "></img>
      </div>
      <h1 className="font-semibold text-5xl text-center">
        Oops, Page Not Found
      </h1>
      <Link
      to="/"
        className="btns w-fit! mx-auto"
      >
       <BackButton name="Back to Home" color="black"/>
      </Link>
     
    </div>
  );
};

export default ErrorPage;