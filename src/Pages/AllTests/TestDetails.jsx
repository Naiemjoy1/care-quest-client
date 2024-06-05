import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useTests from "../../Components/Hooks/useTests";
import usePromotions from "../../Components/Hooks/usePromotions";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { FaCheckCircle } from "react-icons/fa";
import useAuth from "../../Components/Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import useBook from "../../Components/Hooks/useBook";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TestDetails = () => {
  const { _id } = useParams();
  const [tests] = useTests();
  const [test, setTest] = useState(null);
  const [capacity, setCapacity] = useState(0);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [promotions, loading] = usePromotions(); // Fetch promotions and loading state
  const [promoCode, setPromoCode] = useState("");
  const [finalPrice, setFinalPrice] = useState(null);
  const [promoCodeError, setPromoCodeError] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [booking, refetch] = useBook();

  useEffect(() => {
    console.log("Promotions:", promotions);
    const foundTest = tests.find((test) => test._id === _id);
    if (foundTest) {
      setTest(foundTest);
      setCapacity(foundTest.capacity);
      setSlots(foundTest.slots);
      setSelectedSlot(foundTest.slots[0]);
    }
  }, [tests, _id, promotions]);

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  const handleOpen = async () => {
    if (user && user.email) {
      // Check if the user is blocked
      const response = await axiosSecure.get(`/users/status/${user.email}`);
      if (response.data.status === "blocked") {
        Swal.fire({
          title: "Account Blocked",
          text: "Your account has been blocked and you cannot book a slot.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      setOpen(true);
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Please log in to book a slot",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signin", { state: { from: location } });
        }
      });
    }
  };

  const handleClose = () => setOpen(false);

  const handleConfirmBooking = () => {
    console.log("Confirm button clicked");
    const foundTest = tests.find((test) => test._id === _id);
    console.log("Found Test Data:", foundTest, "User:", user?.email);
    const finalBookingPrice = finalPrice !== null ? finalPrice : test.price;
    const bookTest = {
      bookId: test._id,
      email: user.email,
      name: user.displayName,
      test_name: test.name,
      image: test.image,
      date: test.date,
      selectedSlot,
      originalPrice: test.price,
      finalPrice: finalBookingPrice,
    };
    handleClose();
    axiosSecure.post("/bookings", bookTest).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${test.name} is booked`,
          showConfirmButton: false,
          timer: 1500,
        });
        handleClose();
        refetch();
      }
    });
    // Update slots after confirming booking
    setSlots(slots.filter((slot) => slot !== selectedSlot));
    // Perform booking confirmation logic here
    setBookingStatus("Report Pending");
  };

  if (!test) {
    return <p>Test not found</p>;
  }

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
    setPromoCodeError(false); // Reset promo code error when promo code changes
  };

  const applyPromoCode = () => {
    const foundPromotion = promotions.find(
      (promotion) => promotion.couponCode === promoCode
    );
    if (foundPromotion) {
      const discountRate = parseFloat(
        foundPromotion.discountRate.replace("%", "")
      );
      const discountedPrice = test.price - (test.price * discountRate) / 100;
      setFinalPrice(discountedPrice);
    } else {
      setFinalPrice(null);
      setPromoCodeError(true); // Set promo code error if not found
    }
  };

  return (
    <div>
      <figure>
        <img className="h-[550px] w-full" src={test.image} alt={test.name} />
      </figure>
      <div className="flex justify-between gap-10 container mx-auto my-14">
        <div className="w-1/2">
          <p>{booking.length}</p>
          <h2 className="card-title">{test.name}</h2>
          <p>{test.description}</p>
          <p>Date: {test.date}</p>
          <p>Price: ${test.price}</p>
          {/* <p>Capacity: {capacity}</p> */}
          <p>Slots: {slots.join(", ")}</p>
        </div>
        <div className="w-1/2">
          {capacity > 0 && slots.length > 0 ? (
            <div>
              <label htmlFor="slot-select" className="block mb-2">
                Select a Slot:
              </label>
              <select
                id="slot-select"
                value={selectedSlot}
                onChange={handleSlotChange}
                className="block mb-4 p-2 border rounded"
              >
                {slots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <Button variant="contained" onClick={handleOpen}>
                Book Now
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  {bookingStatus === "Report Pending" ? (
                    <Typography
                      id="modal-modal-description"
                      sx={{
                        mt: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ marginBottom: "8px" }}>
                        <span className=" text-4xl text-green-600">
                          <FaCheckCircle />
                        </span>
                      </div>
                      <div>Your report is pending.</div>
                    </Typography>
                  ) : (
                    <>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        {test.name}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Date: {test.date}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Selected Slot: {selectedSlot}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Original Price: ${test.price}
                      </Typography>
                      {promoCode && finalPrice !== null && (
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Final Price after Discount: ${finalPrice}
                        </Typography>
                      )}
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <TextField
                          label="Promocode"
                          variant="outlined"
                          fullWidth
                          value={promoCode}
                          onChange={handlePromoCodeChange}
                          error={promoCodeError}
                          helperText={
                            promoCodeError && "Promo code is not valid"
                          }
                          sx={{ mt: 2 }}
                        />
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={applyPromoCode}
                        sx={{ mt: 2 }}
                      >
                        Apply Promocode
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleConfirmBooking}
                        sx={{ mt: 2 }}
                      >
                        Confirm
                      </Button>
                    </>
                  )}
                </Box>
              </Modal>
            </div>
          ) : (
            <p>No available slots</p>
          )}
          {bookingStatus && <p>{bookingStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
