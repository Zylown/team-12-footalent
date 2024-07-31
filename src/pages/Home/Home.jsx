import CardWelcome from "../../sections/Home/CardWelcome";
import Profile from "../../sections/Home/Profile";

const Home = () => {
  return (
    <div className="flex flex-col pb-4 items-center bg-[#fafdff]">
      <Profile />
      <CardWelcome />
    </div>
  );
};

export default Home;
