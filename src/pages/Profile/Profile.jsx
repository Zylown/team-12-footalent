import InfoProfile from "../../sections/Profile/InfoProfile";
import Adjustments from "../../sections/Profile/Adjustments";
const Profile = () => {
  return (
    <div className="flex flex-col items-center mt-6 gap-6">
      <InfoProfile />
      <Adjustments />
    </div>
  );
};

export default Profile;
