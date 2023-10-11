import { DefaultSpinner } from "../../ui/Spinner";
import { useProducts } from "./useProducts";

import ShopProductCard from "./ShopProductCard-v2";
import CartDropDown from "../../ui/CartDropDown";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function ShopProductTable() {
  const { isLoading, products, error } = useProducts();
  const [searchParams] = useSearchParams();
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  if (isLoading) {
    return <DefaultSpinner />;
  }

  if (error) {
    return <div>Error loading product: {error.message}</div>;
  }

  if (!products) {
    return <div>Product not found.</div>;
  }

  let filterValue;

  const filterNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  let filteredProducts = products.slice().sort((a, b) => a.id - b.id);

  for (const number of filterNumbers) {
    const paramKey = `filter${number}`;
    if (searchParams.has(paramKey)) {
      filterValue = searchParams.get(paramKey);
      filteredProducts = filteredProducts.filter((product) =>
        product.categories.includes(filterValue),
      );
    }
  }

  console.log(filterValue);

  return (
    <div className="container mx-auto grid-cols-1 grid md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white">
      {filteredProducts.map((product) => (
        <ShopProductCard product={product} key={product.id} />
      ))}
      <CartDropDown isCartOpen={isCartOpen} />
    </div>
  );
}
export default ShopProductTable;
