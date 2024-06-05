import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";

const UserStatus = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic
      .get(`/users/status/${id}`)
      .then((response) => setStatus(response.data.status))
      .catch((error) => console.error(error));
  }, [id, axiosPublic]);

  const handleStatusChange = (newStatus) => {
    axiosPublic
      .patch(`/users/status/${id}`, { status: newStatus })
      .then((response) => {
        setStatus(newStatus);
        alert("Status updated successfully");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>User Status</h2>
      <p>Current status: {status}</p>
      <button
        onClick={() => handleStatusChange("active")}
        disabled={status === "active"}
      >
        Activate
      </button>
      <button
        onClick={() => handleStatusChange("blocked")}
        disabled={status === "blocked"}
      >
        Block
      </button>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default UserStatus;
