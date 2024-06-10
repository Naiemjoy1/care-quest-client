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
import Doctor from "./Doctor";

const DoctorsTabs = ({ doctors }) => {
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
    <Swiper
      spaceBetween={20}
      // navigation={true}
      autoplay={{ delay: 8000 }}
      loop={true}
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      className="mySwiper"
      breakpoints={breakpoints}
    >
      {doctors.map((doctor) => (
        <SwiperSlide key={doctor._id}>
          <Doctor doctor={doctor}></Doctor>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DoctorsTabs;
