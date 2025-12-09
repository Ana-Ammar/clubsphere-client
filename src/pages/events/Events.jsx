import EventCard from "./event_card/EventCard";

const Events = () => {
  const event = {
    _id: "evt1",
    clubId: "1",
    title: "Sunset Photography Walk",
    description:
      "Join us for a relaxing evening photography walk along the riverbanks. Suitable for beginners and pros alike.",
    eventDate: "2025-12-15T16:00:00Z",
    location: "Dhaka, Bangladesh",
    isPaid: true,
    eventFee: 300,
    maxAttendees: 20,
    image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
    createdAt: "2025-11-01T10:00:00Z",
  };

  return (
    <div className="min-h-screen overflow-x-hidden py-12 px-4 sm:px-6 lg:px-12">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-8">
        Upcoming Events
      </h1>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <EventCard event={event} />
      </div>
    </div>
  );
};

export default Events;
