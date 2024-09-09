import { useEffect, useState } from "react";

const usePromotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://care-quest-server.vercel.app//promotions")
      .then((res) => res.json())
      .then((data) => {
        setPromotions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching promotions:", error);
        setLoading(false);
      });
  }, []);

  return [promotions, loading];
};

export default usePromotions;
