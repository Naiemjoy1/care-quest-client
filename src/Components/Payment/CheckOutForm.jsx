import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

const CheckOutForm = ({ handleConfirmBooking, finalPrice, test }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [cardComplete, setCardComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (finalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: finalPrice })
        .then((res) => {
          // console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error creating payment intent:", err);
          setError("Error creating payment intent");
        });
    }
  }, [axiosSecure, finalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("[error]", error);
      setError(error.message);
    } else {
      // console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    handleConfirmBooking();

    if (confirmError) {
      console.error("Error confirming card payment:", confirmError);
      setError(confirmError.message);
    } else {
      // console.log("Payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // console.log("Transaction ID:", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // save payment
        const payment = {
          email: user.email,
          price: finalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          bookId: test._id,
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        // console.log("Payment saved:", res.data);
        if (res.data?.paymentResult.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank You for payment",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard");
        }
      }
    }
  };

  const handleCardChange = (event) => {
    setError(event.error ? event.error.message : "");
    setCardComplete(event.complete);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Please Pay: {finalPrice}</p>
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
        onChange={handleCardChange}
      />
      <button
        className="btn btn-primary btn-sm mt-10 text-white"
        type="submit"
        disabled={!stripe || !clientSecret || !cardComplete}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckOutForm;
