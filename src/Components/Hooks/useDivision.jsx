import { useEffect, useState } from "react";

const useDivision = () => {
  const [divisions, setDivisions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await fetch("/divisions.json");
        if (!response.ok) {
          throw new Error("Failed to fetch divisions");
        }
        const data = await response.json();
        setDivisions(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchDivisions();
  }, []); // Empty dependency array to ensure effect runs only once

  return { divisions, error };
};

export default useDivision;
