import { useForm } from "react-hook-form";
import {
  FiSave,
  FiMapPin,
  FiDollarSign,
  FiUsers,
  FiImage,
  FiCalendar,
  FiUpload,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import BackButton from "../../../../../components/back_button/BackButton";
import Button from "../../../../../components/button/Button";
import { useAddEvent } from "../../../../../hooks/useAddEvent";

const AddEventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate } = useAddEvent();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    const payload = {
      ...data,
      clubId: id,
      eventFee: Number(data.eventFee) || 0,
      maxAttendees: Number(data.maxAttendees) || 0,
    };

    mutate(payload);
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-100 p-6 rounded-xl shadow-md border border-base-200">
      <BackButton
        name="Back"
        color="black"
        handleBtn={() => {
          navigate(-1);
        }}
      />
      <h3 className="text-2xl text-center font-semibold mb-4">Create Event</h3>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input-field"
            placeholder="Event title"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="input-field"
            placeholder="Short description"
            rows={4}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image Link</label>
          <div className="flex items-center gap-2">
            <FiImage />
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              className="input-field"
              {...register("bannerImage")}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <div className="flex gap-2 items-center">
            <FiMapPin />
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="input-field"
              placeholder="City / Area"
            />
          </div>
          {errors.location && (
            <p className="text-sm text-red-500 mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Event Date</label>
          <div className="flex gap-2 items-center">
            <FiCalendar />
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="input-field"
              placeholder="Event Date"
            />
          </div>
          {errors.date && (
            <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Event Image URL</label>
          <div className="flex items-center gap-2">
            <FiUpload size={20} className="text-primary" />
            <input
              type="text"
              {...register("eventImage", { required: true })}
              className="input-field w-full"
              placeholder="Paste image link here"
            />
          </div>
        </div>

        {/* Max Attendees */}
        <div>
          <label className="block mb-1 font-medium">Max Attendees</label>
          <div className="flex gap-2 items-center">
            <FiUsers />
            <input
              type="number"
              {...register("maxAttendees", {
                required: "Provide max attendees (0 for unlimited)",
                min: { value: 0, message: "Cannot be negative" },
              })}
              className="input-field"
              placeholder="e.g., 50"
            />
          </div>
          {errors.maxAttendees && (
            <p className="text-sm text-red-500 mt-1">
              {errors.maxAttendees.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button icon={FiSave} name="Create Event" />
      </form>
    </div>
  );
};

export default AddEventForm;
