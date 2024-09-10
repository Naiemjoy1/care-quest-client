import { useState, useEffect } from "react";
import useTests from "../../Components/Hooks/useTests";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";

const AllTests = () => {
  const [tests] = useTests();
  const [filteredTests, setFilteredTests] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [categories, setCategories] = useState([]);

  // Extract unique categories from the tests data
  useEffect(() => {
    if (tests.length > 0) {
      const uniqueCategories = [
        "All",
        ...new Set(tests.map((test) => test.category)),
      ];
      setCategories(uniqueCategories);
    }
  }, [tests]);

  // Filter tests based on the selected tab (category)
  useEffect(() => {
    if (tabIndex === 0 || categories[tabIndex] === "All") {
      setFilteredTests(tests); // "All" tab shows all tests
    } else {
      const selectedCategory = categories[tabIndex];
      const filtered = tests.filter(
        (test) => test.category === selectedCategory
      );
      setFilteredTests(filtered);
    }
  }, [tabIndex, tests, categories]);

  return (
    <div className="container mx-auto px-5">
      <h1 className="text-center text-2xl mb-4">All Tests</h1>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          {categories.map((category, index) => (
            <Tab key={index}>{category}</Tab>
          ))}
        </TabList>
        {categories.map((category, index) => (
          <TabPanel key={index}>
            <div className="grid lg:grid-cols-3 gap-4">
              {filteredTests.length > 0 ? (
                filteredTests.map((test) => (
                  <div key={test.id}>
                    <div className="card card-compact bg-base-100 border h-[450px]">
                      <figure>
                        <img src={test.image} alt="Shoes" />
                      </figure>
                      <div className="card-body">
                        <h2 className="card-title">{test.name}</h2>
                        <p>{test.description}</p>
                        <p>Date: {test.date}</p>
                        <p>Slots: {test.slots.join(", ")} </p>
                        <div className="card-actions justify-end">
                          <Link to={`/tests/${test._id}`}>
                            <button className="btn btn-primary text-white">
                              View Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No tests available for {category}</p>
              )}
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default AllTests;
