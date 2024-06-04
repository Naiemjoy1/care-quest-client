import { useState, useEffect, useCallback } from "react";
import AllTest from "./AllTest";
import useTests from "../../Components/Hooks/useTests";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const AllTests = () => {
  const [filteredTests, setFilteredTests] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  // Fetch tests using the custom hook
  const [tests] = useTests();
  console.log("all test page", tests);

  const filterTests = useCallback(() => {
    const today = new Date();
    let filtered = tests.filter((test) => new Date(test.date) >= today);

    if (searchDate) {
      filtered = filtered.filter((test) => test.date.includes(searchDate));
    }

    if (tabIndex === 1) {
      filtered = filtered.filter((test) => test.category === "Hematology");
    }

    setFilteredTests(filtered);
  }, [tests, searchDate, tabIndex]);

  useEffect(() => {
    filterTests();
  }, [tests, searchDate, tabIndex, filterTests]);

  const handleSearch = (event) => {
    setSearchDate(event.target.value);
  };

  return (
    <div>
      <div className="flex justify-between py-2 px-6 rounded-full items-center gap-4 border border-primary w-1/2 mx-auto mt-10 text-center">
        <h2>All Tests</h2>
        <input
          type="date"
          value={searchDate}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="container mx-auto my-12">
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>All</Tab>
            <Tab>Hematology</Tab>
          </TabList>
          <TabPanel>
            <div className="grid grid-cols-3 gap-4">
              {filteredTests.map((test) => (
                <AllTest key={test.id} test={test}></AllTest>
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-3 gap-4">
              {filteredTests.map((test) => (
                <AllTest key={test.id} test={test}></AllTest>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AllTests;
