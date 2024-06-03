import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import PopularTest from "./PopularTest";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

const FeaturedTest = () => {
  const [test, setTest] = useState([]);

  useEffect(() => {
    fetch("featuredTests.json")
      .then((res) => res.json())
      .then((data) => {
        const popularItems = data.filter((item) => item.category === "Popular");
        setTest(popularItems);
      });
  }, []);

  return (
    <div className="mt-10 container mx-auto">
      <section>
        <SectionTitle
          heading="Discover our top-rated tests carefully curated for you."
          subHeading="Featured Tests"
        ></SectionTitle>
      </section>

      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        navigation={true}
        autoplay={{ delay: 8000 }}
        loop={true}
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        className="mySwiper"
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {test.map((item) => (
          <SwiperSlide key={item._id}>
            <PopularTest item={item}></PopularTest>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedTest;
