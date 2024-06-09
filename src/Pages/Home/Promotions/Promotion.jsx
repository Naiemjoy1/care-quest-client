import { IoIosGift } from "react-icons/io";

const Promotion = ({ promotion }) => {
  const { cupontitle, cupondescrioption, expiry, cuponcode, rate } = promotion;
  return (
    <div>
      <div className="card bg-gradient-to-r from-cyan-500 to-blue-500 shadow-xl h-[310px]">
        <div className="p-5">
          <div className="flex justify-between items-center">
            <h2 className="card-title">{cupontitle}</h2>
            <div className="flex items-center">
              <p className="text-6xl text-gray-300">
                <IoIosGift />
              </p>
            </div>
          </div>
          <p className="text-4xl font-bold">{rate}</p>
          <p>{cupondescrioption}</p>
          <div className="divider"></div>
          <div className="flex justify-between">
            <p>Expiry</p>
            <p className="font-semibold">{expiry}</p>
          </div>
          <div className="flex justify-between">
            <p>Coupon Code</p>
            <p className="font-semibold">{cuponcode}</p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Promotion;
