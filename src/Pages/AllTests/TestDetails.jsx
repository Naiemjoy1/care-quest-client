import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useTests from "../../Components/Hooks/useTests";
import usePromotions from "../../Components/Hooks/usePromotions";

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

  const handleBooking = () => {
    if (capacity > 0 && selectedSlot) {
      setCapacity(capacity - 1);
      setSlots(slots.filter((slot) => slot !== selectedSlot));
      setBookingStatus("Report Pending");
      setSelectedSlot(slots.filter((slot) => slot !== selectedSlot)[0] || "");
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!test) {
    return <p>Test not found</p>;
  }

  // Function to handle promo code input change
  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  // Function to find promotions data by promo code and log it in console
  const applyPromoCode = () => {
    const foundPromotion = promotions.find(
      (promotion) => promotion.couponCode === promoCode
    );
    if (foundPromotion) {
      // Extract the discount rate from the string and parse it as a number
      const discountRate = parseFloat(
        foundPromotion.discountRate.replace("%", "")
      );
      // Calculate final price after applying discount rate
      const discountedPrice = test.price - (test.price * discountRate) / 100;
      // Update booking status with discount applied
      setBookingStatus(discountedPrice);
    } else {
      // If no promotion found for the entered code, display an error message
      setBookingStatus(null);
    }
  };

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
                    Original Price: ${test.price}
                  </Typography>
                  {promoCode && bookingStatus && (
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Final Price after Discount: ${bookingStatus}
                    </Typography>
                  )}
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <TextField
                      label="Promocode"
                      variant="outlined"
                      fullWidth
                      value={promoCode}
                      onChange={handlePromoCodeChange}
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
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Confirm
                  </Button>
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
