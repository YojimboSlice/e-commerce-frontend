export const getShipment = async (data) => {
  try {
    const response = await fetch("http://localhost:3000/shipment", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        fromAddress: {
          name: "James Yan Lan",
          street1: "417 Montgomery St",
          street2: "FL 5",
          city: "San Francisco",
          state: "CA",
          zip: "94104",
          country: "US",
          company: "EasyPost",
          phone: "415-123-4567",
        },
        toAddress: {
          street1: data.address,
          street2: data.apartment,
          name: `${data.firstName} ${data.lastName}`,
          city: data.city,
          state: data.state,
          zip: data.zip,
          email: data.email,
          phone: data.phone,
        },
        parcel: {
          length: 8,
          width: 5,
          height: 5,
          weight: 5,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
