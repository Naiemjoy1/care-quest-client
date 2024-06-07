import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const CheckOutForm = ({
  handleConfirmBooking,
  finalPrice,
  test,
  filteredBookings,
}) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { price } = test;

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axiosSecure.post("/create-payment-intent", {
          price: finalPrice,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };
    if (finalPrice !== null) {
      fetchClientSecret();
    }
  }, [axiosSecure, finalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
        },
      }
    );
    if (error) {
      console.log("Payment error:", error);
      setError(error.message);
    } else {
      console.log("Payment intent:", paymentIntent);
      handleConfirmBooking();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>{price}</p>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <Button
          type="submit"
          disabled={!stripe || !clientSecret}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Pay
        </Button>
        <p className="text-red-600">{error}</p>
      </form>
    </div>
  );
};

export default CheckOutForm;
