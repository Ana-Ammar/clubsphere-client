import { useSearchParams } from "react-router";
import BackButton from "../../../components/back_button/BackButton";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaHome } from "react-icons/fa";
import LoadingSpinner from "../../../components/loading_spinner/LoadingSpinner";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["payment-success", sessionId],
    queryFn: async () => {
      const res = await axiosSecure.post(
        `/payment-success?session_id=${sessionId}`
      );
      return res.data;
    },
    enabled: !!sessionId,
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  const { paymentInfo } = data;


  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-gray-50 rounded-xl shadow-md text-center">
      <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
      <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-gray-700 mb-4">
        You joined{" "}
        <span className="font-semibold">{paymentInfo?.clubName}</span>
      </p>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <p className="text-sm text-gray-600">
          Amount Paid:{" "}
          <span className="font-semibold">{paymentInfo?.amount} USD</span>
        </p>
        <p className="text-sm text-gray-600">
          Transaction ID:{" "}
          <span className="font-semibold">{paymentInfo?.transactionId}</span>
        </p>
      </div>

      <BackButton link="/dashboard/my-clubs" name="Back" color="black" />
    </div>
  );
};

export default PaymentSuccess;
