import NewProducts from "../features/shop/NewProducts";
import TopProducts from "../features/shop/TopProducts";

const Footer = () => {
  return (
    <div className="flex gap-x-8">
      <NewProducts />
      <TopProducts />
    </div>
  );
};
export default Footer;
