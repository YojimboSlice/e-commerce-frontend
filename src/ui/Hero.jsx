// import Carousel from "./Carousel";

import Carousel from "./Carousel";

const slides = [
  "images/hero-img-1.jpg",
  "images/hero-img-2.jpg",
  "images/hero-img-3.jpg",
];

const Hero = () => {
  return (
    <div>
      <Carousel>{slides}</Carousel>
    </div>
  );
};
export default Hero;
