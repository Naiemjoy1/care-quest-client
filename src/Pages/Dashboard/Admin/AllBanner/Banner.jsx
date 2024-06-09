import { Link } from "react-router-dom";

const Banner = ({ banner, isChecked, onCheckboxChange, handleDelete }) => {
  const {
    bannertitle,
    description,
    image,
    cupontitle,
    cupondescrioption,
    expiry,
    rate,
    cuponcode,
    isActive,
  } = banner;
  return (
    <div className="flex justify-between items-center gap-10">
      <input
        type="checkbox"
        defaultChecked={isChecked}
        className="checkbox checkbox-xs"
        onChange={() => onCheckboxChange(banner._id)}
      />
      <div
        className="hero "
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className=" text-neutral-content">
          <div className="flex justify-center gap-4 items-center p-4 text-sm">
            <div className="w-1/2 space-y-2">
              <h1 className="font-bold">{bannertitle}</h1>
              <p className="">{description}</p>
              <Link to="/tests">
                <button className="btn btn-sm btn-primary text-white">
                  Get All Test
                </button>
              </Link>
            </div>
            <div className="w-1/2 space-y-2">
              <p className=" font-bold">{cupontitle}</p>
              <section className="flex gap-2 items-center">
                <p className="font-bold text-2xl text-primary">{rate}</p>
                <div>
                  <p>Cupon Code: {cuponcode}</p>
                  <p>Expiry: {expiry}</p>
                </div>
              </section>
              <p>{cupondescrioption}</p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => handleDelete(banner)}
        className="btn btn-accent text-white btn-xs"
      >
        Delete
      </button>
    </div>
  );
};

export default Banner;
