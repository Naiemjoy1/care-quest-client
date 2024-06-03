import AboutClinic from "./About/AboutClinic";
import AllDoctors from "./AllDoctors/AllDoctors";
import Banner from "./Banner/Banner";
import Doctors from "./Doctors/Doctors";
import Extra from "./Extra/Extra";
import FeaturedTest from "./FeaturedTest/FeaturedTest";
import Promotions from "./Promotions/Promotions";
import Reviews from "./Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AboutClinic></AboutClinic>
      <FeaturedTest></FeaturedTest>
      <Doctors></Doctors>
      <Promotions></Promotions>
      <AllDoctors></AllDoctors>
      <Reviews></Reviews>
      <Extra></Extra>
    </div>
  );
};

export default Home;
