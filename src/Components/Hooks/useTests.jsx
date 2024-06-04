import { useEffect, useState } from "react";

const useTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/tests")
      .then((res) => res.json())
      .then((data) => {
        setTests(data);
        setLoading(false);
        console.log("Fetched data:", data); // Log the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return [tests, loading];
};

export default useTests;
