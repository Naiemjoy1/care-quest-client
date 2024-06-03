import { IoIosGift } from "react-icons/io";

const Promotion = ({ promotion }) => {
  const { title, description, expiry, couponCode, discountRate } = promotion;
  return (
    <div>
      <div className="card bg-gradient-to-r from-cyan-500 to-blue-500 shadow-xl h-[310px]">
        <div className="p-5">
          <div className="flex justify-between">
            <h2 className="card-title">{title}</h2>
            <p className=" text-6xl text-gray-300">
              <IoIosGift />
            </p>
          </div>
          <p className="text-4xl font-bold">{discountRate}</p>
          <p>{description}</p>
          <div className="divider"></div>
          <div className="flex justify-between">
            <p>Expiry</p>
            <p className=" font-semibold">{expiry}</p>
          </div>
          <div className="flex justify-between">
            <p>Coupon Code</p>
            <p className=" font-semibold">{couponCode}</p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Promotion;
