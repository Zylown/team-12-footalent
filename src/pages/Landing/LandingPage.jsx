import LContact from "../../sections/Landing/LContact";
import LFeatures from "../../sections/Landing/LFeatures";
import LFooter from "../../sections/Landing/LFooter";
import LHeader from "../../sections/Landing/LHeader";
import LTypesUsers from "../../sections/Landing/LTypesUsers";
import LUs from "../../sections/Landing/LUs";

export default function LandingPage() {
  return (
    <div className="wrapper__landing">
      <LHeader />
      <LFeatures />
      <LUs />
      <LTypesUsers />
      <LContact />
      <LFooter />
    </div>
  );
}
