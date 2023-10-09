import { useState } from "react";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";

function Features({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleIsOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="flex flex-col space-y-2">
      <button
        onClick={handleIsOpen}
        className="flex justify-between items-center"
      >
        <span
          className={`text-[20px] md:text-xl ${
            isOpen ? "text-indigo-400" : ""
          }`}
        >
          Features
        </span>
        {isOpen ? (
          <HiOutlineMinus className="text-[25px] md:text-xl" />
        ) : (
          <HiOutlinePlus className="text-[25px] md:text-xl" />
        )}
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden  ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Features;
