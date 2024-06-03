import { useEffect, useState } from "react";
import Promotion from "./Promotion";

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
      <div className="container mx-auto text-white mt-5">
        {promotions.map((promotion) => (
          <Promotion key={promotion._id} promotion={promotion}></Promotion>
        ))}
      </div>
    </div>
  );
};

export default Promotions;
