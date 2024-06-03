import AboutClinic from "./About/AboutClinic";
import Banner from "./Banner/Banner";
import Doctors from "./Doctors/Doctors";
import FeaturedTest from "./FeaturedTest/FeaturedTest";
import Promotions from "./Promotions/Promotions";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AboutClinic></AboutClinic>
      <FeaturedTest></FeaturedTest>
      <Doctors></Doctors>
      <Promotions></Promotions>
    </div>
  );
};

export default Home;
