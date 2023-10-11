import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi2";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateItemQuantity,
  removeItemFromCart,
  setFinalTotal,
} from "./cartSlice";
import { Link } from "react-router-dom";

const CheckoutCart = ({
  shippingPrice,
  shippingService,
  rates,
  handleSubmit,
  onSubmit2,
  totalTax,
  taxRate,
}) => {
  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = useSelector((state) => state.cart.subtotal);
  const dispatch = useDispatch();

  function handleQuantityChange(itemId, itemColor, itemSize, newQuantity) {
    newQuantity > 0 &&
      dispatch(
        updateItemQuantity({
          id: itemId,
          color: itemColor,
          size: itemSize,
          newQuantity: newQuantity,
        }),
      );
  }

  function handleDelete(itemId) {
    dispatch(removeItemFromCart(itemId));
  }

  const finalTotal = (subtotal + shippingPrice + subtotal * taxRate).toFixed(2);

  function handleConfirmOrder() {
    dispatch(setFinalTotal(finalTotal));
  }

  return (
    <>
      {cartItems.length < 1 ? (
        <div className="flex items-center justify-center text-xl font-semibold">
          <span>No items in cart</span>
        </div>
      ) : (
        <div className="mx-8 mt-10">
          <h2 className="pl-8 text-lg">Order Summary</h2>
          <div className="border mx-6 my-2 rounded-lg divide-y divide-blue-gray-200 bg-white">
            <ul className="text-lg px-4 divide-y divide-blue-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          {/* <a href={product.href}>
                                          {product.name}
                                        </a> */}
                        </h3>
                        <p className="ml-4">{item.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                      <p className="mt-1 text-sm text-gray-500">{item.size}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="justify-start flex gap-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.color,
                              item.size,
                              item.quantity - 1,
                            )
                          }
                        >
                          <HiOutlineMinus />
                        </button>
                        <p className="text-gray-500">Qty {item.quantity}</p>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.color,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                        >
                          <HiOutlinePlus />
                        </button>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => handleDelete(item.id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-col justify-center py-2 mx-4 gap-y-4 pb-4">
              <span className="flex justify-between">
                <p>Subtotal</p> <p>{subtotal.toFixed(2)}</p>
              </span>
              <span className="flex justify-between">
                <p>USPS {shippingService}</p>{" "}
                {rates !== undefined ? (
                  <p>{shippingPrice}</p>
                ) : (
                  <p>Shipping required</p>
                )}
              </span>
              <span className="flex justify-between">
                <p>Taxes</p>{" "}
                <p>
                  {taxRate ? (
                    parseFloat(subtotal * taxRate).toFixed(2)
                  ) : (
                    <span>Shipping required</span>
                  )}
                </p>
              </span>
              <div className="border-b border-blue-gray-200 mx-8"></div>
              <div className="flex justify-between items-center py-2">
                <span>Total</span>
                {finalTotal ? (
                  <span>{finalTotal}</span>
                ) : (
                  <span>{`${subtotal} + shipping & tax`}</span>
                )}
              </div>
              {cartItems.length > 0 && (
                <div className="flex justify-center">
                  <Link to="/payment">
                    <Button onClick={handleConfirmOrder}>CONFIRM ORDER</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CheckoutCart;
