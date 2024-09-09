import { useEffect, useState } from "react";

const useDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://care-quest-server.vercel.app//doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      });
  }, []);
  return [doctors, loading];
};

export default useDoctors;
