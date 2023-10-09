import { useQuery } from "@tanstack/react-query";
import ShopProductCard from "../features/shop/ShopProductCard-v2";

const FlameResistant = () => {
  const { data: products } = useQuery(["products"]);

  const fireResistant = products.filter((product) => product.fr === true);
  return (
    <div className="container mx-auto grid grid-cols-3 gap-4">
      {fireResistant.map((product) => (
        <ShopProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
export default FlameResistant;
