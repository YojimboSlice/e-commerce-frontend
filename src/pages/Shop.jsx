import Footer from "../ui/Footer";
import ShopOperations from "../features/shop/ShopOperations";
import ShopProductTable from "../features/shop/ShopProductTable";

const Shop = () => {
  return (
    <>
      <ShopOperations
        options={[
          { value: "all", label: "All", id: 1 },
          { value: "men", label: "Men", id: 2 },
          { value: "women", label: "Women", id: 3 },
          { value: "on-sale", label: "On Sale", id: 4 },
          { value: "flame-resistant", label: "Flame Resistant", id: 5 },
          { value: "pants", label: "Pants", id: 6 },
          { value: "shirt", label: "Shirts", id: 7 },
          { value: "hi-vis", label: "Hi-Vis", id: 8 },
        ]}
      />

      <ShopProductTable />

      <Footer />
    </>
  );
};
export default Shop;
