import Logo from "./Logo";
import MainNav from "./MainNav";
import StickyNavbar from "./MainNav-v2";

const NavigationBar = () => {
  return (
    <>
      {/* <div className="bg-white row-span-full lg:flex lg:gap-x-8 items-center h-16 justify-between fixed top-0 w-full z-50 opacity-95">
        <Logo />
        <MainNav />
      </div> */}
      <div className="top-0 pt-4 fixed w-full z-50 px-6">
        <StickyNavbar />
      </div>
    </>
  );
};
export default NavigationBar;
