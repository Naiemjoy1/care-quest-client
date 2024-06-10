import Swal from "sweetalert2";
import useBook from "../../Components/Hooks/useBook";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import useAuth from "../../Components/Hooks/useAuth";

const Appointments = () => {
  const { user } = useAuth();
  const [booking, refetch] = useBook();
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
            // Correcting the typo
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

  // Filter bookings for the logged-in user
  const userBookings = booking.filter((item) => item.email === user.email);

  // Sort bookings by nearest date
  const sortedBooking = userBookings.slice().sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div>
      <div className="flex justify-evenly">
        <p>Booking Appointments:</p>
        <p>{userBookings.length}</p>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date</th>
                <th>Slot</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sortedBooking.map((item, index) => (
                <tr key={item._id}>
                  <th>
                    <p>{index + 1}</p>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.test_name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.date}</td>
                  <td>{item.selectedSlot}</td>
                  <th>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-accent text-white btn-xs"
                    >
                      Cancel
                    </button>
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

export default Appointments;
