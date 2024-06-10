import useAuth from "../../Components/Hooks/useAuth";
import useBook from "../../Components/Hooks/useBook";

const TestResults = () => {
  const { user } = useAuth();
  const [booking] = useBook();
  const deliveredBookings = booking.filter(
    (item) => item.status === "Delivered" && item.email === user?.email
  );
  // console.log("rest result show", deliveredBookings);
  return (
    <div>
      <h2>User test result: {deliveredBookings.length}</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Report</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {deliveredBookings.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.test_name}</td>
                  <td>
                    {/* The button to open modal */}
                    <label
                      htmlFor="my_modal_7"
                      className="btn btn-sm btn-success text-white"
                    >
                      See Report
                    </label>

                    {/* Put this part before </body> tag */}
                    <input
                      type="checkbox"
                      id="my_modal_7"
                      className="modal-toggle"
                    />
                    <div className="modal" role="dialog">
                      <div className="modal-box">
                        <h3 className="text-lg font-bold text-center">
                          <a href={item.report}>
                            Click Here To See Your Report
                          </a>
                        </h3>
                      </div>
                      <label className="modal-backdrop" htmlFor="my_modal_7">
                        Close
                      </label>
                    </div>
                  </td>
                  <td>
                    <button className="btn btn-success btn-sm text-white">
                      Done
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
