import Promotion from "./Promotion";

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
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Promotions = () => {
  const axiosSecure = useAxiosSecure();
  const { data: banners = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banners");
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
    <div className=" bg-secondary py-32 px-5">
      <div className="lg:w-1/2 text-center mx-auto text-white space-y-4">
        <p className="text-lg font-bold">Diagnostic plans</p>
        <p className="lg:text-5xl text-3xl text-primary font-semibold">
          Our special offers
        </p>
        <p>
          Etiam condimentum aliquam odio, ut consectetur enim. Nullam metus
          purus, pharetra quis tempus id, feugiat a augue. Etiam condimentum
          aliquam odio, ut consectetur enim.
        </p>
      </div>
      <div className="container mx-auto text-white mt-10">
        <Swiper
          spaceBetween={20}
          // navigation={true}
          autoplay={{ delay: 8000 }}
          loop={true}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          className="mySwiper"
          breakpoints={breakpoints}
        >
          {banners.map((promotion) => (
            <SwiperSlide key={promotion._id}>
              <Promotion promotion={promotion}></Promotion>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Promotions;
