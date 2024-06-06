import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Tests = () => {
  const axiosSecure = useAxiosSecure();

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
                        <div className="font-bold">{test.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(test)}
                      className="btn btn-xs btn-accent text-white"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button>Update</button>
                  </td>

                  <td>
                    <button className="btn btn-ghost btn-xs">details</button>
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
