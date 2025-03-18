import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import grp1 from "../images/grp1.jpg";
import grp2 from "../images/grp2.jpg";
import grp3 from "../images/grp3.jpg";

export default function Hero() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 300);
  }, []);

  return (
<section
  className="flex flex-col items-center justify-center min-h-screen px-5 py-10 overflow-hidden bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600"
>
  {/* Centered Title */}
  <div className="text-center max-w-3xl" style={{ marginTop: "40px" }}>
    <h2 className="text-4xl md:text-5xl font-semibold text-white">
      "Join. Connect. Thrive."
    </h2>
    <p className="text-sm md:text-base text-gray-200 italic max-w-xl mx-auto mt-2">
      "Alone, we are strong. Together, we are unstoppable. Join us in creating a thriving community of faith and friendship."
    </p>
  </div>

  {/* Content & Images */}
  <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full gap-10 mt-10">
    {/* Left Content */}
    <div className="max-w-md text-center md:text-left">
      <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
        "Connecting People Across Faiths & Interests"
      </h1>
      <p className="text-lg text-gray-200 mt-4">
        Connect Community brings people together through faith, friendship, and shared interests. Join us to build meaningful connections and engage in vibrant discussions.
      </p>

      <a
        href="/events"
        className="inline-flex items-center bg-blue-500 text-white px-6 py-3 mt-5 text-lg rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Explore Events
        <ArrowRightIcon className="ml-2 w-5 h-5" />
      </a>
    </div>

  
    <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-lg">
      <img
        src={grp1}
        alt="Community 1"
        className={`w-full max-w-[250px] h-auto object-cover rounded-lg shadow-md transition-transform duration-700 ease-out 
          ${animate ? "scale-100 opacity-100" : "scale-75 opacity-0"} 
          hover:scale-105`}
      />
      <img
        src={grp2}
        alt="Community 2"
        className={`w-full max-w-[250px] h-auto object-cover rounded-lg shadow-md transition-transform duration-700 ease-out 
          ${animate ? "scale-100 opacity-100" : "scale-75 opacity-0"} 
          hover:scale-105`}
      />
      <div className="col-span-2 flex justify-center">
        <img
          src={grp3}
          alt="Community 3"
          className={`w-full max-w-[250px] h-auto object-cover rounded-lg shadow-md transition-transform duration-700 ease-out 
            ${animate ? "scale-100 opacity-100" : "scale-75 opacity-0"} 
            hover:scale-105`}
        />
      </div>
    </div>
  </div>
</section>

  );
}
