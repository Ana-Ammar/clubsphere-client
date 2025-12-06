import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center text-base-100 bg-linear-to-b from-accent/70 to-primary p-10">
      <aside>
         <h1 className="flex-1 font-black text-2xl flex items-center">
             <span className="bg-white/20 rounded-4xl py-2 px-4">ClubSphere</span>
            </h1>
        <p className="font-bold">
          Explore clubs near you
        </p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link>
            <FaFacebook size={24} />
          </Link>
          <Link>
            <FaInstagram size={24} />
          </Link>
          <Link>
            <FaXTwitter size={24} />
          </Link>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
