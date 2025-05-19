import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";

const Banner = () => {
  const axiosSecure = useAxiosSecure();

  const { data: banners = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banners");
      return res.data;
    },
  });

  const activeBanners = banners.filter((banner) => banner.isActive);

  return (
    <div>
      {activeBanners.map((banner, index) => (
        <div
          key={index}
          className="hero"
          style={{
            backgroundImage: `url(${banner.image})`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className=" hero-content text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 items-center mx-auto container gap-4">
              <div className="lg:w-1/2 space-y-4">
                <h1 className="text-5xl font-bold">{banner.bannertitle}</h1>
                <p className="">{banner.description}</p>
                <Link to="/tests">
                  <button className="btn btn-sm mt-5 btn-primary text-white">
                    Get All Test
                  </button>
                </Link>
              </div>
              <div className="flex justify-center items-center">
                <div className="lg:w-1/2 space-y-4 text-center">
                  <p className="text-3xl font-bold text-left">
                    {banner.cupontitle}
                  </p>
                  <section className="flex gap-2 items-center justify-center">
                    <p className="font-bold text-6xl text-primary">
                      {banner.rate}
                    </p>
                    <div className="text-left">
                      <p>Coupon Code: {banner.cuponcode}</p>
                      <p>Expiry: {banner.expiry}</p>
                    </div>
                  </section>
                  <p className="text-left">{banner.cupondescrioption}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
