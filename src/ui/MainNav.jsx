import { NavLink } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineFire,
  HiOutlineSparkles,
  HiOutlineIdentification,
  HiOutlineEnvelope,
  HiOutlineMagnifyingGlass,
  HiOutlineShoppingCart,
} from "react-icons/hi2";

import { toggleCart } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const MainNav = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector((state) => state.cart.isOpen);
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);

  function handleCartClick() {
    dispatch(toggleCart(!isCartOpen));
    console.log(isCartOpen);
  }

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <nav>
      <ul className="flex space-x-4 lg:space-x-8 items-center justify-center">
        <li>
          <NavLink to="home" className="flex items-center">
            <HiOutlineHome className="text-2xl" />
            <span className="text-lg">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="shop" className="flex items-center">
            <HiOutlineShoppingBag className="text-2xl" />
            <span className="text-lg">Shop</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="flame-resistant" className="flex items-center">
            <HiOutlineFire className="text-2xl" />
            <span className="text-lg">Flame Resistant</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="non-flame-resistant" className="flex items-center">
            <HiOutlineSparkles className="text-2xl" />
            <span className="text-lg">Non-Flame Resistant</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="about" className="flex items-center">
            <HiOutlineIdentification className="text-2xl" />
            <span className="text-lg">About Us</span>
          </NavLink>
        </li>
        <li className="lg:pr-10">
          <NavLink to="contact" className="flex items-center">
            <HiOutlineEnvelope className="text-2xl" />
            <span className="text-lg">Contact</span>
          </NavLink>
        </li>
        <li>
          <HiOutlineMagnifyingGlass className="text-2xl" />
        </li>
        <li className="lg:pr-10 cursor-pointer">
          <div className="relative">
            <HiOutlineShoppingCart
              onClick={handleCartClick}
              className="text-2xl"
            />
            {cartItems.length > 0 && (
              <div class="absolute top-0 right-0 bg-red-500 text-white w-3/5 h-3/5 rounded-full flex items-center justify-center text-xs">
                {totalQuantity}
              </div>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
};
export default MainNav;
