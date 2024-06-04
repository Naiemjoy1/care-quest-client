import AllTest from "./AllTest";

const AllTestsTab = ({ filteredTests }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {filteredTests.map((test) => (
        <AllTest key={test.id} test={test}></AllTest>
      ))}
    </div>
  );
};

export default AllTestsTab;
