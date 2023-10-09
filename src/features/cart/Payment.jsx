import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Payment() {
  const [stripePromise, setStripePromise] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const finalTotal = useSelector((state) => state.cart.finalTotal);

  const amount = Math.round(finalTotal * 100);

  console.log(amount);

  useEffect(() => {
    try {
      fetch("https://amused-wasp-undershirt.cyclic.app/config")
        .then(async (r) => {
          if (!r.ok) {
            throw new Error("Network response was not ok");
          }
          const { publishableKey } = await r.json();
          setStripePromise(loadStripe(publishableKey));
          console.log(publishableKey);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          // Handle the error here, e.g., set an error state or display an error message.
        });
    } catch (error) {
      console.error("Error in useEffect:", error);
      // Handle the error here, e.g., set an error state or display an error message.
    }
  }, []);

  useEffect(() => {
    try {
      fetch("https://amused-wasp-undershirt.cyclic.app/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      })
        .then(async (r) => {
          if (!r.ok) {
            throw new Error("Something went wrong with the payment intent");
          }
          const { clientSecret } = await r.json({});
          setClientSecret(clientSecret);
          console.log("Client secret: " + clientSecret);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          // Handle the error here, e.g., set an error state or display an error message.
        });
    } catch (error) {
      console.error("Error in useEffect:", error);
      // Handle the error here, e.g., set an error state or display an error message.
    }
  }, [amount]);

  const appearance = {
    theme: "flat",
  };

  const options = { clientSecret, appearance };

  return (
    <div className="p-12 grid grid-cols-2">
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
      <span className="ml-40">Total: {finalTotal}</span>
    </div>
  );
}

export default Payment;
