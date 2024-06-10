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

  const { data: populars = [] } = useQuery({
    queryKey: ["popular-tests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popular-tests");
      return res.data;
    },
  });

  const breakpoints = {
    // when window width is >= 320px (small devices)
    320: {
      slidesPerView: 1,
    },
    // when window width is >= 640px (medium devices)
    640: {
      slidesPerView: 2,
    },
    // when window width is >= 1024px (large devices)
    1024: {
      slidesPerView: 3,
    },
  };

  return (
    <div className="container mx-auto my-10 px-5 lg:px-0">
      <Swiper
        spaceBetween={20}
        navigation={true}
        autoplay={{ delay: 8000 }}
        loop={true}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        className="mySwiper"
        breakpoints={breakpoints}
      >
        {populars.map((popular) => (
          <SwiperSlide key={popular.test._id}>
            <PopularTest popular={popular.test}></PopularTest>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedTest;
