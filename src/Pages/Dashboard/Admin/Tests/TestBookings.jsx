import useBook from "../../../../Components/Hooks/useBook";

const TestBookings = ({ testId }) => {
  const [booking] = useBook();
  // console.log("booking data from test name", booking);
  return (
    <div>
      <h2>hello</h2>
    </div>
  );
};

export default TestBookings;
