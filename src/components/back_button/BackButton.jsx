import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router';

const BackButton = ({name, link}) => {
    return (
         <Link
        to={link}
        className={`border border-base-100 text-base-100 rounded-full py-2 ${name !== 'Back' ? "px-6" : "px-4"} text-xs font-bold cursor-pointer hover:bg-white ${name === "Back"? "hover:text-accent" : "hover:text-primary" } transition-all flex items-center gap-2`}
      >
      {name === 'Back' && <IoMdArrowRoundBack />}  {name}
      </Link>
    );
};

export default BackButton;