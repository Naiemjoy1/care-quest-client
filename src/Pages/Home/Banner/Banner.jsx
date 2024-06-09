import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Banner = () => {
  const axiosSecure = useAxiosSecure();

  const { data: banners = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banners");
      return res.data;
    },
  });

  // Filter active banners
  const activeBanners = banners.filter((banner) => banner.isActive);

  console.log("active banners", activeBanners);

  return (
    <div>
      {activeBanners.map((banner, index) => (
        <div
          key={index}
          className="hero min-h-screen"
          style={{
            backgroundImage: `url(${banner.image})`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="flex justify-between items-center gap-20 hero-content text-white">
            <div className="w-1/2 space-y-4">
              <h1 className=" text-5xl font-bold">{banner.bannertitle}</h1>
              <p className="">{banner.description}</p>
              <Link to="/tests">
                <button className="btn btn-sm mt-5 btn-primary text-white">
                  Get All Test
                </button>
              </Link>
            </div>
            <div className="w-1/2 space-y-4 ">
              <p className="text-3xl font-bold">{banner.cupontitle}</p>
              <section className="flex gap-2 items-center">
                <p className="font-bold text-6xl text-primary">{banner.rate}</p>
                <div>
                  <p>Cupon Code: {banner.cuponcode}</p>
                  <p>Expiry: {banner.expiry}</p>
                </div>
              </section>
              <p>{banner.cupondescrioption}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
