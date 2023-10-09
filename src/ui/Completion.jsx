import { useSelector } from "react-redux";

function Completion() {
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.items;

  console.log(cart);
  console.log(cartItems);

  const sendEmail = async () => {
    const recipientEmail = "jamesryanlan@gmail.com";
    const emailSubject = "Hello";
    const emailText = "This is a test email";
    const emailHtml = "<p>This is a test email</p>";

    try {
      const response = await fetch("http://localhost:3000/send-email ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientEmail,
          emailSubject,
          emailText,
          emailHtml,
        }),
      });

      if (response.ok) {
        console.log("Email sent successfully");
      } else {
        console.error("Email sending failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Call the sendEmail function when needed
  sendEmail();

  return (
    <div className="grid grid-rows-2 justify-center">
      <span>Successfully paid!</span>
      <span>Order details and tracking sent to your email</span>

      <ul></ul>
    </div>
  );
}

export default Completion;
