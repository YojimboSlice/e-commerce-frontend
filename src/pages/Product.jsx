import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ColorDropDown from "../ui/ColorDropDown";
import SizeDropDown from "../ui/SizeDropDown";
import Features from "../ui/Features";
import { TabsDefault } from "../ui/TabsDefault";
import { Button } from "@material-tailwind/react";
import CartDropDown from "../ui/CartDropDown";
import { useProductById } from "../features/shop/useProductById";
import { useSkuById } from "../features/cart/useSkuById";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, toggleCart } from "../features/cart/cartSlice";

export default function Product() {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state) => state.cart.isOpen);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { id, color, size } = useParams();

  const { isLoading, product, error } = useProductById(id);

  const { sku: skuData, skuLoading, skuError } = useSkuById(id, color, size);

  const {
    name,
    sizes,
    colors,
    title,
    description,
    images,
    additionalInfo,
    features,
    prices,
  } = product || {};

  const { price } = skuData || {};
  console.log(price);

  const productPrice = prices?.length
    ? prices.length < 2
      ? prices[0]
      : `${prices[0]} - $${prices[prices.length - 1]}`
    : 0;

  useEffect(() => {
    return () => {
      dispatch(toggleCart(false));
    };
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading product: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  if (skuLoading) {
    return <div>Loading SKUS...</div>;
  }

  if (skuError) {
    return <div>Error loading product: {skuError.message}</div>;
  }

  const index = color ? colors.indexOf(color) : 0;

  function handleClick() {
    dispatch(toggleCart(true));

    const itemToAdd = {
      id,
      name,
      color,
      size,
      price,
      image: images[index],
      quantity: quantity,
    };
    dispatch(addItemToCart(itemToAdd));
    console.log(itemToAdd);
  }

  return (
    <>
      <div>
        <CartDropDown isCartOpen={isCartOpen} />
      </div>
      <div className="grid md:grid-cols-2 grid-rows-6 med:px-24 lg:px-12">
        <div className="flex flex-col justify-center items-center gap-y-4">
          {images.length === colors.length ? (
            <img
              src={images[index] || images[0]}
              alt={name}
              className="border-gray-100 border-2 px-4 rounded-lg shadow-md md:w-3/4 lg:w-5/8 object-fit w-1/2"
            />
          ) : (
            <img
              src={images[0]}
              alt={name}
              className="border-gray-100 border-2 px-4 rounded-lg shadow-md md:w-3/4 lg:w-5/8 object-fit w-1/2"
            />
          )}
        </div>

        <div className="flex flex-col p-4 mt-5 space-y-4">
          <h2 className="border-b-2 pb-2 text-[25px] md:text-[40px]">{name}</h2>
          <span className="lg:text-3xl md:text-[20px]">
            ${skuData.price ? `${skuData.price}` : `${productPrice}`}
          </span>
          {title && <h2 className="">{title}</h2>}
          <Features>
            <ul>
              {features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </Features>

          {/* <SizeAndColor size={size} color={color} /> */}
          <div className="flex gap-4 justify-end lg:justify-center">
            <ColorDropDown colors={colors} id={id} buttonType={"color"} />
            <SizeDropDown sizes={sizes} id={id} sizeButton={"size"} />
          </div>
          {size && color ? (
            <Button onClick={handleClick} variant="outlined">
              Add to Cart
            </Button>
          ) : (
            <span>Pick a color and size</span>
          )}
        </div>
        <div>
          <TabsDefault
            id={id}
            description={description}
            additionalInfo={additionalInfo}
          />
        </div>
        <div className="ml-20"></div>
      </div>
    </>
  );
}

// function SizeAndColor({ colors, sizes }) {
//   console.log(colors);
//   if (color) return <p>Pick a size</p>;
//   if (size) return <p>Pick a color</p>;
//   if (!color && !size) return <p>Pick both a color and size</p>;
//   return;
// }
