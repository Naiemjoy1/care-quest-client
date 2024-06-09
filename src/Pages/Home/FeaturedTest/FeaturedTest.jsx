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
import useTests from "../../../Components/Hooks/useTests";
import useBook from "../../../Components/Hooks/useBook";

const FeaturedTest = () => {
  const [tests] = useTests();
  const [bookings] = useBook();
  console.log("booking for feature", bookings);
  const popular = tests.filter((item) => item.category === "Popular");

  return (
    <div className="mt-10 container mx-auto">
      <div className="w-1/2 text-center mx-auto space-y-4 mb-5">
        <p className="text-lg font-bold">Diagnostic plans</p>
        <p className="text-5xl text-primary font-semibold">Featured Tests</p>
        <p>book: {bookings.length}</p>
        <p>test: {tests.length}</p>
        <p>bookedTests: </p>
      </div>

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
        {popular.map((item) => (
          <SwiperSlide key={item._id}>
            <PopularTest item={item}></PopularTest>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedTest;
