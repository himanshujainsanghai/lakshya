"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const imgs = [
  {
    path: "/adminPortal.png",
    portal: "Admin",
    para: "Oversee your institute's operations with an intuitive, user-friendly dashboard that houses all your administrative information in one place. Get rid of time-consuming, paper-laden manual processes with built-in automation tools.",
  },
  {
    path: "/teacherPortal.png",
    portal: "Teacher",
    para: "Staff can access their portal to manage courses, update lesson plans, track student progress, and communicate with students. It simplifies administrative tasks and allows them to focus on what matters most—teaching.",
  },
  {
    path: "/studentPortal.png",
    portal: "Student",
    para: "Students can now view their schedules, check attendance records, access course materials, and submit assignments. It's a one-stop platform for them to manage their academic life effectively.",
  },
  {
    path: "/parentPortal.png",
    portal: "Parent",
    para: "Help parents stay informed about their child's academic progress, attendance, and upcoming events. They can also communicate with teachers and the school administration, fostering better collaboration.",
  },
];

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
    setDropdownOpen(false); // Close the dropdown on selection
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % imgs.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-mybg2">
      {/* Header Section */}
      <div className="w-full flex flex-col items-center mx-3 py-16 gap-4">
        <h1 className="font-bold text-3xl lg:text-4xl text-center">
          Portals for Every User Persona
        </h1>
        <p className="font-medium text-gray-500 text-lg lg:text-2xl text-center hidden lg:block">
          Personalized portals offer multiple perspectives with customized
          access to information and services. This helps enhance communication,
          transparency, and collaboration among all stakeholders.
        </p>
      </div>

      {/* Main Section */}
      <div className="flex flex-1 flex-col xl:flex-row transition-all duration-500">
        {/* Buttons Section for Larger Screens */}
        <div className="hidden xl:flex flex-col justify-center items-center w-2/5 gap-5">
          {imgs.map((image, i) => (
            <button
              key={i}
              onClick={() => handleButtonClick(i)}
              className={`bg-mybg3 text-white w-4/5 px-5 py-4 rounded-md hover:bg-mybg4 ${
                activeIndex === i ? "bg-gray-400" : ""
              }`}
            >
              <h2 className="font-semibold text-xl">{image.portal}</h2>
              {activeIndex === i && (
                <p className="font-medium mt-2">{image.para}</p>
              )}
            </button>
          ))}
        </div>

        {/* Dropdown Section for Smaller Screens */}
        <div className="xl:hidden w-full px-5 py-4">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full bg-mybg3 text-white px-4 py-3 rounded-md flex justify-between items-center"
          >
            <span className="font-semibold">
              {imgs[activeIndex].portal} Portal
            </span>
            <svg
              className={`w-6 h-6 transform transition-transform duration-300 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="bg-mybg3 text-white mt-3 rounded-md">
              {imgs.map((image, i) => (
                <button
                  key={i}
                  onClick={() => handleButtonClick(i)}
                  className="w-full text-left px-4 py-3 hover:bg-mybg4"
                >
                  <h2 className="font-semibold text-lg">{image.portal}</h2>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Image Rendering Section */}
        <div className="w-full xl:w-3/5 flex items-center justify-center">
          <div className="relative w-full xl:w-4/5 lg:h-[500px] flex items-center justify-center">
            <Image
              src={imgs[activeIndex].path}
              alt="Image"
              layout="intrinsic"
              width={800}
              height={500}
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
