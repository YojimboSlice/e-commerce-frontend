import { useQuery } from "@tanstack/react-query";
import ShopProductCard from "../features/shop/ShopProductCard-v2";

const NonFlameResistant = () => {
  const { data: products } = useQuery(["products"]);

  const fireResistant = products.filter((product) => product.fr === false);
  return (
    <div className="container mx-auto grid grid-cols-3 gap-4">
      {fireResistant.map((product) => (
        <ShopProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
export default NonFlameResistant;
