import { useEffect, useState } from "react";
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

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetch("promotions.json")
      .then((res) => res.json())
      .then((data) => {
        setPromotions(data);
      });
  }, []);

  return (
    <div className=" bg-secondary pt-32 pb-14">
      <div className="w-1/2 text-center mx-auto text-white space-y-4">
        <p className="text-lg font-bold">Diagnostic plans</p>
        <p className="text-5xl text-primary font-semibold">
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
          slidesPerView={3}
          //   navigation={true}
          autoplay={{ delay: 6000 }}
          loop={true}
          // pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          className="mySwiper"
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log("slide change")}
        >
          {promotions.map((promotion) => (
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
