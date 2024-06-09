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

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAuth from "../../Components/Hooks/useAuth";

const ReviewSlider = ({ reviews, _id }) => {
  const { user } = useAuth() || {}; // Ensure user is properly handled even if undefined

  const filteredReviews = reviews.filter(
    (review) => review.reviewsId === _id && review.email === user?.email
  );
  console.log("Filtered Reviews for slider: ", filteredReviews);

  return (
    <div>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 8000 }}
        loop={true}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        className="mySwiper"
      >
        {filteredReviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col w-full max-w-lg p-6 divide-y rounded-md divide-primary bg-secondary text-gray-100">
              <div className="flex justify-between p-4">
                <div className="flex space-x-4">
                  <div>
                    <img
                      src={review.image}
                      alt=""
                      className="object-cover w-12 h-12 rounded-full bg-gray-500"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{review.name}</h4>
                    <span className="text-xs dark:text-gray-600">
                      {review.source}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-yellow-500">
                  <Rating
                    style={{ maxWidth: 180 }}
                    value={review.rating}
                    readOnly
                  />
                  <span className="text-xl font-bold">{review.rating}</span>
                </div>
              </div>
              <div className="p-4 space-y-2 text-sm text-gray-400">
                <p>{review.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
