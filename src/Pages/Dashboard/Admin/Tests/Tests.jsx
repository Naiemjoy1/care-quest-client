import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import useBook from "../../../../Components/Hooks/useBook";
import useAllBookings from "../../../../Components/Hooks/useAllBookings";
import AddReview from "../AddReview/AddReview";
import { MdDelete, MdOutlineRateReview } from "react-icons/md";

const Tests = () => {
  const axiosSecure = useAxiosSecure();
  const [bookings] = useBook();
  const [currentTestId, setCurrentTestId] = useState(null); // State to hold the current test _id
  console.log("booking data from test name", bookings);

  const [allBookings] = useAllBookings();
  console.log("all books", allBookings);

  const { data: tests = [], refetch } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tests");
      return res.data;
    },
  });

  const handleDelete = (test) => {
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
        axiosSecure.delete(`/tests/${test._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <div className="flex justify-evenly">
        <h2>Total Test: {tests.length}</h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Delete</th>
                <th>Update</th>
                <th>Add Review</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {tests.map((test, index) => (
                <tr key={test._id}>
                  <td>{index + 1}</td>
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
                        <h2>{test.name}</h2>
                        <div className="flex gap-2">
                          <p>Reservision: </p>
                          <ul>
                            {bookings
                              .filter((booking) => booking.bookId === test._id)
                              .map((booking) => (
                                <li key={booking._id}>{booking.email}</li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(test)}
                      className="btn btn-xs btn-accent text-white"
                    >
                      <MdDelete />
                    </button>
                  </td>
                  <td>
                    <Link to={`/dashboard/updateitem/${test._id}`}>
                      <button className="btn btn-xs btn-warning">
                        <FaEdit className="text-white" />
                      </button>
                    </Link>
                  </td>

                  <td>
                    <button
                      className="btn btn-xs btn-primary text-white"
                      onClick={() => {
                        setCurrentTestId(test._id);
                        document.getElementById("my_modal_2").showModal();
                      }}
                    >
                      <MdOutlineRateReview />
                    </button>
                    <dialog id="my_modal_2" className="modal">
                      <div className="modal-box p-4">
                        <AddReview
                          onCloseModal={handleCloseModal}
                          _id={currentTestId}
                        />
                      </div>
                      <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                      </form>
                    </dialog>
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

export default Tests;
