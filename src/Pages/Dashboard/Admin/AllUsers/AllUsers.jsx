import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  // p: 4,
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
      // If user is admin, don't change status
      return;
    }

    axiosSecure.patch(`/users/status/${user._id}`, { status }).then((res) => {
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
    });
  };

  const [openModal, setOpenModal] = useState(false); // State to control modal visibility

  // Function to handle opening the modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div className="flex justify-evenly">
        <h2>All Users</h2>
        <h2>Total User: {users.length}</h2>
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
                    {user.upazila},{user.district}
                    <br />
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-accent text-white btn-xs"
                      >
                        user
                      </button>
                    )}
                  </td>
                  <td>
                    {user.status === "active" ? (
                      <button
                        onClick={() => handleChangeStatus(user, "blocked")}
                        className="btn btn-warning text-white  btn-xs"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => handleChangeStatus(user, "active")}
                        className="btn btn-success text-white  btn-xs"
                      >
                        Activate
                      </button>
                    )}
                  </td>
                  <th>
                    <button
                      onClick={() => handleDelete(user)}
                      className="btn btn-accent text-white btn-xs"
                    >
                      Delete
                    </button>
                  </th>
                  <th>
                    <button className="btn btn-xs">View Details</button>
                  </th>
                  <th>
                    <button onClick={handleOpenModal} className="btn btn-xs">
                      see info
                    </button>
                    <Modal open={openModal} onClose={handleCloseModal}>
                      <Box sx={style}>
                        <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-gray-900 text-gray-100">
                          <img
                            src={user.image}
                            alt=""
                            className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square"
                          />
                          <div className="space-y-4 text-center divide-y divide-gray-700">
                            <div className="my-2 space-y-1">
                              <h2 className="text-xl font-semibold sm:text-2xl">
                                {user.name}
                              </h2>
                              <p className="px-5 text-xs sm:text-base text-gray-400">
                                {user.email}
                              </p>
                            </div>
                            <div className=" justify-center pt-2 space-x-4 align-center">
                              <p className="px-5 text-xs sm:text-base text-gray-400">
                                Blood Group: {user.bloodGroup}
                              </p>
                              <p className="px-5 text-xs sm:text-base text-gray-400">
                                Address: {user.upazila},{user.district}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Box>
                    </Modal>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
