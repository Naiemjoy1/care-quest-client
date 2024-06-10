import { useState } from "react";
import useBook from "../../../../Components/Hooks/useBook";
import useTests from "../../../../Components/Hooks/useTests";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Components//Hooks/useAxiosSecure";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdCancel } from "react-icons/md";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TiUpload } from "react-icons/ti";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 12,
};

const Reservations = () => {
  const [bookings, refetch] = useBook();
  // console.log("booking all", bookings);
  const [tests] = useTests();
  const [searchTerm, setSearchTerm] = useState("");
  const axiosSecure = useAxiosSecure();

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your booking has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handleChangeStatus = (booking, status, report) => {
    axiosSecure
      .patch(`/bookings/status/${booking._id}`, { status, report })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          handleCloseModal();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Booking status changed to ${status}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const [report, setReport] = useState(""); // State to hold report data

  const handleReportChange = (e) => {
    setReport(e.target.value);
  };

  const filteredTests = tests.filter((test) =>
    bookings.some((booking) => booking.bookId === test._id)
  );

  const displayedTests = filteredTests.filter((test) =>
    bookings.some(
      (booking) =>
        booking.bookId === test._id && booking.email.includes(searchTerm)
    )
  );

  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleOpenModal = (booking) => {
    setCurrentUser(booking);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentUser(null);
  };

  return (
    <div>
      <h2>Reservations: ({displayedTests.length})</h2>
      <input
        type="text"
        placeholder="Search by email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered"
      />
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Tests Name</th>
              <th>Reservation</th>
            </tr>
          </thead>
          <tbody>
            {displayedTests.map((test, index) => (
              <tr key={test._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={test.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{test.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="overflow-x-auto">
                    <table className="table table-zebra">
                      <thead>
                        <tr>
                          <th></th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings
                          .filter((booking) => booking.bookId === test._id)
                          .map((booking, index) => (
                            <tr key={booking._id}>
                              <th>{index + 1}</th>
                              <td>{booking.email}</td>
                              <td>
                                <button
                                  className="btn text-white btn-xs btn-error"
                                  onClick={() => handleDelete(booking._id)}
                                >
                                  <MdCancel />
                                </button>
                              </td>
                              <td>
                                {booking.status === "Pending" ? (
                                  <button
                                    onClick={() => handleOpenModal(booking)}
                                    className="btn btn-xs btn-warning text-white"
                                  >
                                    <TiUpload />
                                  </button>
                                ) : (
                                  <button className="btn btn-success text-white btn-xs">
                                    <IoCheckmarkCircle />
                                  </button>
                                )}
                              </td>
                              <td>
                                <td>
                                  <td>
                                    {booking.status === "Pending" ? (
                                      <button
                                        onClick={() =>
                                          handleChangeStatus(
                                            booking,
                                            "Delivered"
                                          )
                                        }
                                        className="btn btn-success text-white btn-xs"
                                      >
                                        Pending
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          handleChangeStatus(booking, "Pending")
                                        }
                                        className="btn btn-warning text-white btn-xs"
                                      >
                                        Delivered
                                      </button>
                                    )}
                                  </td>
                                </td>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {currentUser && (
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={style}>
            <div className="flex flex-col gap-5 justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-gray-900 text-gray-100">
              <h2>Upload Report</h2>
              <input
                type="text"
                name="report"
                placeholder="Report"
                value={report}
                onChange={handleReportChange}
                className="input input-bordered text-black w-full max-w-xs"
              />
              {/* Button to change booking status and submit report */}
              {currentUser.status === "Pending" ? (
                <button
                  onClick={
                    () => handleChangeStatus(currentUser, "Delivered", report) // Pass report data
                  }
                  className="btn btn-success text-white btn-xs"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={
                    () => handleChangeStatus(currentUser, "Pending", report) // Pass report data
                  }
                  className="btn btn-warning text-white btn-xs"
                >
                  Delivered
                </button>
              )}
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Reservations;
