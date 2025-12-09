import ClubCard from "./club_card/ClubCard";

// Example fake data (replace with API fetch later)
const clubs = [
  {
    _id: "1",
    clubName: "Photography Club",
    category: "Photography",
    location: "Banani, Dhaka",
    membershipFee: 0,
    status: "approved",
  },
  {
    _id: "2",
    clubName: "Tech Innovators",
    category: "Tech",
    location: "Uttara, Dhaka",
    membershipFee: 500,
    status: "pending",
  },
  {
    _id: "3",
    clubName: "Sports Mania",
    category: "Sports",
    location: "Gulshan, Dhaka",
    membershipFee: 300,
    status: "approved",
  },
];

const Clubs = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="py-12 px-4 sm:px-6 lg:px-12">
        <h1 className="text-3xl font-bold text-center mb-8">Clubs</h1>

        <div className="grid grid-cols-1 gap-6">
          {clubs.map((club) => (
            <ClubCard key={club._id} club={club}></ClubCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clubs;
