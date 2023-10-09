import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import Carousel from "../ui/Carousel";

const slides = [
  "images/hero-img-1.jpg",
  "images/hero-img-2.jpg",
  "images/hero-img-3.jpg",
];

const HomePage = () => {
  return (
    <div>
      <Carousel autoSlide={true}>
        {slides.map((s, i) => (
          <LazyLoadImage
            className="flex max-w-screen-small  lg:max-w-screen mx-auto"
            src={s}
            alt="high quality gear in use"
            key={i}
          />
        ))}
      </Carousel>
    </div>
  );
};
export default HomePage;
