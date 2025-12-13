import { GridLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <GridLoader color="#6a72e4" margin={5} />
    </div>
  );
};

export default LoadingSpinner;
