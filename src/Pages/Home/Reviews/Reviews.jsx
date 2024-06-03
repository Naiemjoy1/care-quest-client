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
import { useEffect, useState } from "react";
import Review from "./Review";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("recommendations.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        console.log(data);
      });
  }, []);

  return (
    <div className=" bg-secondary py-12">
      <div className="w-1/2 text-center mx-auto text-white space-y-2 mb-10">
        <p className="text-lg font-bold">Testimonials</p>
        <p className="text-5xl text-primary font-semibold">
          What our patients say
        </p>
      </div>
      <div className="container mx-auto">
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
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <Review review={review}></Review>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
