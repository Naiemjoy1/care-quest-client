import { useState, useEffect, useCallback } from "react";
import AllTest from "./AllTest";
import useTests from "../../Components/Hooks/useTests";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const AllTests = () => {
  const [filteredTests, setFilteredTests] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [tests] = useTests();

  const testsPerPage = 6;
  const totalPages = Math.ceil(filteredTests.length / testsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);

  return (
    <div className="container mx-auto px-5">
      <div className="flex justify-between py-2 px-6 rounded-full items-center gap-4 border border-primary lg:w-1/2 mx-auto mt-10 text-center">
        <p>All Tests</p>
        <input
          type="date"
          value={searchDate}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className=" my-12">
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>All</Tab>
            <Tab>Hematology</Tab>
          </TabList>
          <TabPanel>
            <div className="grid lg:grid-cols-3 gap-4">
              {currentTests.map((test) => (
                <AllTest key={test.id} test={test}></AllTest>
              ))}
            </div>
            <div className="join">
              {[...Array(totalPages)].map((_, index) => (
                <input
                  key={index}
                  className="join-item btn btn-square mt-10"
                  type="radio"
                  name="options"
                  aria-label={index + 1}
                  checked={currentPage === index + 1}
                  onChange={() => handlePageChange(index + 1)}
                />
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AllTests;
