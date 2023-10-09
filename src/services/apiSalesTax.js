export const getSalesTax = async (data, subtotal, lineItems, shippingPrice) => {
  try {
    const response = await fetch(
      "https://amused-wasp-undershirt.cyclic.app/salestax",
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          from_country: "US",
          from_zip: "96797",
          from_state: "HI",
          from_city: "Waipahu",
          from_street: "94-416 Uke'e Street",
          to_country: data.country,
          to_zip: data.zip,
          to_state: data.state,
          to_city: data.city,
          to_street: data.address,
          amount: subtotal,
          shipping: shippingPrice || 0,
          // nexus_addresses: [
          //   {
          //     id: "Main Location",
          //     country: "US",
          //     zip: "96797",
          //     state: "HI",
          //     city: "Waipahu",
          //     street: "94-416 Uke-e Street STE 101",
          //   },
          // ],
          line_items: lineItems,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
