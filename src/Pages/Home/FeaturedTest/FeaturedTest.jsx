import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";

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
import PopularTest from "./PopularTest";

const FeaturedTest = () => {
  const axiosSecure = useAxiosSecure();

  const { data: populars = {} } = useQuery({
    queryKey: ["popular-tests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popular-tests");
      return res.data;
    },
  });

  return (
    <div className="container mx-auto my-10">
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
        {populars.map((popular) => (
          <SwiperSlide key={popular.test._id}>
            <PopularTest popular={popular.test}></PopularTest>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* {populars.map((popular) => (
        <PopularTest
          key={popular.test._id}
          popular={popular.test}
        ></PopularTest>
      ))} */}
    </div>
  );
};

export default FeaturedTest;
