import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

function ShopProductCard({ product }) {
  const { image, name, id, colors, sizes } = product;
  const { color, size } = useParams();

  const upperCaseName = name.toUpperCase();
  return (
    <div className="col-span-1 p-2 flex flex-col bg-stone-50 border-2  rounded-lg border-gray-100 shadow-md items-center">
      <div className="grid-cols-3 py-2">
        <Link
          className="relative flex h-60 overflow-hidden rounded-xl"
          to={`/product/${id}`}
        >
          <LazyLoadImage
            src={image}
            alt={name}
            effect="blur"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Link>
        <span className="mr-2">Link 1</span>
        <span className="mr-2">Link 2</span>
      </div>
      <h2 className="mb-2 font-semibold text-lg">{upperCaseName}</h2>
      <div className="flex flex-wrap mt-auto pt-3 text-xs">
        <p className="mr-2 mb-2">Tag #1</p>
        <p className="mr-2 mb-2">Tag #2</p>
      </div>
    </div>
  );
}
export default ShopProductCard;
