import { Controller, useForm } from "react-hook-form";
import { Input, Select, Option, Button } from "@material-tailwind/react";
// import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { setShippingData } from "../features/cart/cartSlice";
import { getShipment } from "../services/apiShipping";
import CheckoutCart from "../features/cart/CheckoutCart";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSalesTax } from "../services/apiSalesTax";
import Payment from "../features/cart/Payment";

function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const shippingInfo = useSelector((state) => state.cart.shippingData);
  const subtotal = useSelector((state) => state.cart.subtotal);
  const [taxes, setTaxes] = useState({});

  const lineItems = cartItems.map(({ id, price, quantity }) => ({
    id,
    quantity,
    product_tax_code: "20010",
    unit_price: price,
    discount: 0,
  }));

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      country: "US",
    },
  });

  const options = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "MX", label: "Mexico" },
  ];

  const onSubmit2 = () => {
    console.log("This is the confirm order button");
  };

  const { rates } = shippingInfo || [];

  const extractedRates =
    rates &&
    rates.map(({ retail_rate, service, shipment_id }) => ({
      retail_rate,
      service,
      shipment_id,
    }));

  const priorityRate =
    rates && extractedRates.find((rate) => rate.service === "Priority");

  const { service: shippingService, retail_rate } = priorityRate || {};

  const shippingPrice = Number(retail_rate);

  // console.log(watch("example")); // watch input value by passing the name of it

  const onSubmit = async (address) => {
    try {
      const shippingData = await getShipment(address);
      if (shippingData) {
        dispatch(setShippingData(shippingData));
        const salesTaxData = await getSalesTax(
          address,
          subtotal,
          lineItems,
          shippingPrice,
        );
        salesTaxData && setTaxes(salesTaxData);
      }
    } catch (error) {
      console.error("Uh oh:", error);
    }
  };

  console.log(taxes);

  const totalTax = taxes.tax?.amount_to_collect;
  const taxRate = taxes.tax?.rate;

  return (
    <div className="lg:mt-16">
      <div className="grid grid-cols-2 border-gray-200 border border-solid mx-16 rounded-lg bg-gray-50">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  gap-y-4 px-6 mt-10"
        >
          <h2 className="text-lg">Contact Information</h2>
          {/* register your input into the hook by invoking the "register" function */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input variant="standard" label="E-mail" {...field} />
            )}
          />
          <h2 className="text-lg">Shipping Information</h2>
          <div className="flex gap-x-2">
            <div className="flex flex-col text-red-500">
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First Name is required" }}
                render={({ field }) => (
                  <Input variant="standard" label="First Name" {...field} />
                )}
              />
              <span>{errors.firstName?.message}</span>
            </div>

            {/* include validation with required or other standard HTML validation rules */}
            <div className="flex flex-col text-red-500">
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last Name is required" }}
                render={({ field }) => (
                  <Input variant="standard" label="Last Name" {...field} />
                )}
              />
              <span>{errors.lastName?.message}</span>
            </div>
          </div>
          <div className="flex flex-col text-red-500">
            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <Input variant="standard" label="Address" {...field} />
              )}
            />
            <span>{errors.address?.message}</span>
          </div>
          <Controller
            name="apartment"
            control={control}
            render={({ field }) => (
              <Input
                variant="standard"
                label="Apartment, suite, etc."
                {...field}
              />
            )}
          />

          <div className="flex gap-x-2">
            <div className="flex flex-col text-red-500">
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <Input variant="standard" label="City" {...field} />
                )}
              />
              <span>{errors.city?.message}</span>
            </div>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select
                  variant="standard"
                  label="Country"
                  {...field}
                  options={options}
                >
                  {options.map((option) => (
                    <Option value={option.value} key={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </div>
          <div className="flex gap-x-2">
            <div className="flex flex-col text-red-500">
              <Controller
                name="state"
                control={control}
                rules={{ required: "State is required" }}
                render={({ field }) => (
                  <Input
                    variant="standard"
                    label="State / Province"
                    {...field}
                  />
                )}
              />
              <span>{errors.state?.message}</span>
            </div>
            <div className="flex flex-col text-red-500">
              <Controller
                name="zip"
                control={control}
                rules={{ required: "Postal code is required" }}
                render={({ field }) => (
                  <Input variant="standard" label="Postal Code" {...field} />
                )}
              />
              <span>{errors.zip?.message}</span>
            </div>
          </div>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input variant="standard" label="Phone" {...field} />
            )}
          />
          <Button
            onClick={handleSubmit((d) => {
              onSubmit(d);
            })}
            variant="outlined"
          >
            Estimate Shipping
          </Button>
        </form>
        <CheckoutCart
          shippingService={shippingService}
          shippingPrice={shippingPrice}
          rates={rates}
          handleSubmit={handleSubmit}
          onSubmit2={onSubmit2}
          totalTax={totalTax}
          taxRate={taxRate}
        />
      </div>
    </div>
  );
}

export default Checkout;
