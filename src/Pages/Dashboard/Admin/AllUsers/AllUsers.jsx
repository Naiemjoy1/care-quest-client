import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import jsPDF from "jspdf";
import { FaFileDownload, FaInfoCircle, FaUsers } from "react-icons/fa";
import { FaUserLargeSlash } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 12,
};

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDelete = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
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

  const handleChangeStatus = (user, status) => {
    if (user.role === "admin") {
      return;
    }

    axiosSecure
      .patch(`/users/status/${user.email}`, { status })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `User status changed to ${status}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error changing status:", error);
      });
  };

  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleOpenModal = (user) => {
    setCurrentUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentUser(null);
  };

  const generatePDF = (user) => {
    const doc = new jsPDF();
    doc.text(`Name: ${user.name}`, 10, 10);
    doc.text(`Email: ${user.email}`, 10, 20);
    doc.text(`Address: ${user.upazila}, ${user.district}`, 10, 30);
    doc.text(`Blood Group: ${user.bloodGroup}`, 10, 40);
    // Add more details as needed
    doc.save(`${user.name}_details.pdf`);
  };

  return (
    <div>
      <div className="flex justify-evenly">
        <h2>All Users</h2>
        <h2>Total Users: {users.length}</h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Address</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
                <th>Details</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={user.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-sm opacity-50">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user.upazila}, {user.district}
                    <br />
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn bg-blue-500 hover:bg-blue-600 text-white btn-xs"
                      >
                        <FaUsers />
                      </button>
                    )}
                  </td>
                  <td>
                    {user.status === "active" ? (
                      <button
                        onClick={() => handleChangeStatus(user, "blocked")}
                        className="btn bg-yellow-500 hover:bg-yellow-600 text-white btn-xs"
                      >
                        <FaUserLargeSlash />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleChangeStatus(user, "active")}
                        className="btn bg-green-500 hover:bg-green-600 text-white btn-xs"
                      >
                        <IoMdCheckmarkCircle />
                      </button>
                    )}
                  </td>

                  <th>
                    <button
                      onClick={() => handleDelete(user)}
                      className="btn bg-red-500 hover:bg-red-600 text-white btn-xs"
                    >
                      <MdDelete />
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="btn bg-purple-500 hover:bg-purple-600 text-white btn-xs"
                    >
                      <FaInfoCircle />
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => generatePDF(user)}
                      className="btn bg-gray-500 hover:bg-gray-600 text-white btn-xs"
                    >
                      <FaFileDownload />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {currentUser && (
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={style}>
            <h2>Hello</h2>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default AllUsers;
