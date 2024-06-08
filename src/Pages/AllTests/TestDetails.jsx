import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import useTests from "../../Components/Hooks/useTests";
import usePromotions from "../../Components/Hooks/usePromotions";
import useAuth from "../../Components/Hooks/useAuth";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import useBook from "../../Components/Hooks/useBook";
import TestSendData from "./TestSendData";
import CheckOutForm from "../../Components/Payment/CheckOutForm";

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
  const [promotions] = usePromotions();
  const [promoCode, setPromoCode] = useState("");
  const [finalPrice, setFinalPrice] = useState(null);
  const [promoCodeError, setPromoCodeError] = useState(false);
  const [finalBookingPrice, setFinalBookingPrice] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [booking, refetch] = useBook();
  const [filteredBookings, setFilteredBookings] = useState([]);
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

  // Calculate total price
  const totalPrice =
    finalPrice !== null ? finalPrice : test ? test.price : null;

  useEffect(() => {
    const foundTest = tests.find((test) => test._id === _id);
    if (foundTest) {
      setTest(foundTest);

      const filteredByBookId = booking.filter((book) => book.bookId === _id);
      setCapacity(foundTest.slots.length - filteredByBookId.length);

      const availableSlots = foundTest.slots.filter(
        (slot) => !filteredByBookId.some((book) => book.selectedSlot === slot)
      );
      setSlots(availableSlots);
      setSelectedSlot(availableSlots[0]);
    }
  }, [tests, _id, booking]);

  useEffect(() => {
    if (test && user) {
      const filtered = booking.filter(
        (book) => book.bookId === _id && book.email === user.email
      );
      setFilteredBookings(filtered);
    }
  }, [booking, test, _id, user]);

  useEffect(() => {
    setFinalBookingPrice(test ? test.price : null);
  }, [test]);

  // Function to handle slot change
  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  // Function to handle modal open
  const handleOpen = async () => {
    const finalBookingPrice = test.price;
    if (user && user.email) {
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
    setFinalPrice(finalBookingPrice);
  };

  // Function to handle modal close
  const handleClose = () => setOpen(false);

  // Function to handle booking confirmation
  const handleConfirmBooking = () => {
    const bookTest = {
      bookId: test._id,
      email: user.email,
      name: user.displayName,
      test_name: test.name,
      image: test.image,
      date: test.date,
      selectedSlot,
      originalPrice: test.price,
      finalPrice: finalPrice,
      status: "Pending",
    };
    handleClose();
    axiosSecure.post("/bookings", bookTest).then((res) => {
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
    setSlots(slots.filter((slot) => slot !== selectedSlot));
    setBookingStatus("Report Pending");
  };

  // Function to handle promo code change
  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
    setPromoCodeError(false);
  };

  // Function to apply promo code
  const applyPromoCode = () => {
    const foundPromotion = promotions.find(
      (promotion) => promotion.couponCode === promoCode
    );
    if (foundPromotion) {
      const discountRate = parseFloat(
        foundPromotion.discountRate.replace("%", "")
      );
      const discountedPrice =
        finalBookingPrice - (finalBookingPrice * discountRate) / 100;
      setFinalPrice(discountedPrice);
    } else {
      setFinalPrice(finalBookingPrice);
      setPromoCodeError(true);
    }
  };

  if (!test) {
    return <p>Test not found</p>;
  }

  return (
    <div>
      <figure>
        <img className="h-[550px] w-full" src={test.image} alt={test.name} />
      </figure>
      <div className="flex justify-between gap-10 container mx-auto my-14">
        <div className="w-1/2">
          <h2 className="card-title">{test.name}</h2>
          <p>{test.description}</p>
          <p>Date: {test.date}</p>
          <p>Price: ${test.price}</p>
          <p>Capacity: {capacity}</p>
          <p>Slots: {slots.join(", ")}</p>
          <p>Total Price: {totalPrice}</p>
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
              {/* test data  */}
              <TestSendData
                handleConfirmBooking={handleConfirmBooking}
                test={test}
                finalPrice={finalPrice}
                finalBookingPrice={finalBookingPrice} // Add this line
              />
              {filteredBookings.map((booking) => (
                <div key={booking._id}>
                  <button className="btn btn-sm btn-primary mt-5 text-white">
                    {booking.status}
                  </button>
                </div>
              ))}

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
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
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Final Price after Discount: ${totalPrice}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <TextField
                      label="Promocode"
                      variant="outlined"
                      fullWidth
                      value={promoCode}
                      onChange={handlePromoCodeChange}
                      error={promoCodeError}
                      helperText={promoCodeError && "Promo code is not valid"}
                      sx={{ mt: 2 }}
                    />
                  </Typography>
                  <div className="grid grid-cols-1 gap-4">
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
                      Pay
                    </Button>
                    <Elements stripe={stripePromise}>
                      <CheckOutForm
                        handleConfirmBooking={handleConfirmBooking}
                        test={test}
                        finalPrice={finalPrice}
                        totalPrice={totalPrice}
                        finalBookingPrice={finalBookingPrice} // Add this line
                      />
                    </Elements>
                  </div>
                </Box>
              </Modal>
            </div>
          ) : (
            <p>No available slots</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
