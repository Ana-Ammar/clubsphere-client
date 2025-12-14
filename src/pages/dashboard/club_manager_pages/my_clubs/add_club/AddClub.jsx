import { useForm } from "react-hook-form";
import { FiUpload, FiSave } from "react-icons/fi";
import useAuth from "../../../../../hooks/useAuth";
import Button from "../../../../../components/button/Button";
import BackButton from "../../../../../components/back_button/BackButton";
import { useNavigate } from "react-router";
import useAddClub from "../../../../../hooks/useAddClub";

const AddClub = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { mutate } = useAddClub();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    mutate(data);
    reset();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-base-100 rounded-xl shadow-lg border border-base-300">
      <BackButton
        name="Back"
        color="black"
        handleBtn={() => {
          navigate(-1);
        }}
      />
      <h2 className="text-2xl font-bold mb-5 text-center">Add New Club</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Club Name */}
        <div>
          <label className="font-semibold">Club Name</label>
          <input
            type="text"
            {...register("clubName", { required: true })}
            className="input-field"
            placeholder="Enter club name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="input-field h-24"
            placeholder="Write a short description"
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold">Category</label>
          <select
            {...register("category", { required: true })}
            className="input-field"
          >
            <option value="">Select Category</option>
            <option value="Photography">Photography</option>
            <option value="Sports">Sports</option>
            <option value="Tech">Tech</option>
            <option value="Music">Music</option>
            <option value="Art">Art</option>
            <option value="Anime">Anime</option>
            <option value="Business">Business</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold">Location (City/Area)</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="input-field"
            placeholder="e.g., Dhaka, Uttara"
          />
        </div>

        {/* Banner Image URL */}
        <div>
          <label className="font-semibold">Banner Image URL</label>
          <div className="flex items-center gap-2">
            <FiUpload size={20} className="text-primary" />
            <input
              type="text"
              {...register("bannerImage", { required: true })}
              className="input-field w-full"
              placeholder="Paste image link here"
            />
          </div>
        </div>

        {/* Membership Fee */}
        <div>
          <label className="font-semibold">Membership Fee (0 for free)</label>
          <input
            type="number"
            {...register("membershipFee", { required: true })}
            className="input-field"
            placeholder="e.g., 0 or 500"
          />
        </div>

        {/* Hidden manager email */}
        <input
          type="hidden"
          {...register("managerEmail")}
          value={user?.email}
        />

        {/* Submit Button */}
        <Button name="Add Club" icon={FiSave}></Button>
      </form>
    </div>
  );
};

export default AddClub;
