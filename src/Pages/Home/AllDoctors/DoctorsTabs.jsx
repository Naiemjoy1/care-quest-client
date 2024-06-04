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
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={3}
      //   navigation={true}
      autoplay={{ delay: 8000 }}
      loop={true}
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      className="mySwiper"
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log("slide change")}
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
