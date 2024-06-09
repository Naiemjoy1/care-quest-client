import React, { useEffect, useState } from "react";

const PopularTests = () => {
  const [popularTests, setPopularTests] = useState([]);

  useEffect(() => {
    fetchPopularTests();
  }, []);

  const fetchPopularTests = async () => {
    try {
      const response = await fetch("http://localhost:3000/popular-tests"); // Replace with your backend URL
      if (!response.ok) {
        throw new Error("Failed to fetch popular tests");
      }
      const data = await response.json();
      setPopularTests(data);
    } catch (error) {
      console.error("Error fetching popular tests:", error.message);
    }
  };

  return (
    <div>
      <h2>Popular Tests</h2>
      <ul>
        {popularTests.map((test) => (
          <li key={test._id}>
            {test.testName} - Bookings: {test.totalBookings}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularTests;
