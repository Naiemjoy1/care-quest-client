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
    fetch("http://localhost:3000reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        // console.log(data);
      });
  }, []);

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
    <div className=" bg-secondary py-12">
      <div className="lg:w-1/2 text-center mx-auto text-white space-y-2 mb-10 px-5">
        <p className="text-lg font-bold">Testimonials</p>
        <p className="lg:text-5xl text-3xl text-primary font-semibold">
          What our patients say
        </p>
      </div>
      <div className="container mx-auto">
        <Swiper
          spaceBetween={20}
          // navigation={true}
          autoplay={{ delay: 8000 }}
          loop={true}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          className="mySwiper"
          breakpoints={breakpoints}
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
