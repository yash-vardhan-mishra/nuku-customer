import React from "react";

import Leaf from "../../assets/leaf.webp";
import Stick from "../../assets/stick.webp";

const Footer = () => {
  return (
    <footer className="relative mx-4">
      <div className="relative">
        <div className="container mx-auto mt-9">
          <h3 className="mb-4 text-center font-bold uppercase text-gray-900">
            Our Goal
          </h3>
          <p className="mb-4 text-center  text-base font-semibold text-sky-700 md:text-lg">
            <span className="text-lime-500">To Sustainably</span> make the joys and benefits of hiking accessible to everyone.
          </p>
          <div className="relative py-10">
            <img
              src={Leaf}
              alt="leaf"
              className="absolute -top-20 right-0 w-28 object-cover sm:w-auto"
            />
          </div>
        </div>
      </div>
      <img
        src={Stick}
        alt="stick"
        className="absolute bottom-0 w-28 object-contain sm:w-auto"
      />
    </footer>
  );
};

export default Footer;
