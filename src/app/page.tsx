"use client";

import Image from "next/image";
import { GiAutoRepair } from "react-icons/gi";
import { FaFileShield } from "react-icons/fa6";
import { LuHandshake } from "react-icons/lu";
import { BsDatabaseFillCheck } from "react-icons/bs";
import ImageSlider from "./components/ImageSlider";
import { useState } from "react";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";

const LoginPage = () => {
  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;
    if (role) {
      router.push(`${role}`);
    }
  }, [user, router]);

  return (
    <div className="w-full flex items-center justify-center">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className=" p-12 rounded-md shadow-2xl flex flex-col gap-2"
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src={"/logo.png"} alt="" width={24} height={24}></Image>
            Lakshya
          </h1>
          <h2 className="text-gray-400">Sign In to your account</h2>

          <Clerk.GlobalError className="text-sm text-red-400" />

          <Clerk.Field name={"identifier"} className="flex flex-col gap-2">
            <Clerk.Label className="text-sm text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            ></Clerk.Input>
            <Clerk.FieldError className="text-sm text-red-400" />
          </Clerk.Field>

          <Clerk.Field name={"password"} className="flex flex-col gap-2">
            <Clerk.Label className="text-sm text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            ></Clerk.Input>
            <Clerk.FieldError className="text-sm text-red-400" />
          </Clerk.Field>

          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] "
          >
            Sign In
          </SignIn.Action>

          <div className="mt-4 p-4 bg-gray-100 rounded-md text-sm">
            <h3 className="font-semibold">Demo Credentials:</h3>
            <p>
              Admin: <strong>admin / admin</strong>
            </p>
            <p>
              Teacher: <strong>teacher / teacher</strong>
            </p>
            <p>
              Student: <strong>student / student</strong>
            </p>
            <p>
              Parent: <strong>parent / parent</strong>
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Please ignore password policies due to weak password.
            </p>
          </div>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

const HomePage = () => {
  const [isLoginVisible, setLoginvisble] = useState(false);

  return (
    <div className="font-sans text-gray-900">
      {/* Header Section */}
      <header className="bg-white shadow-md py-4 px-6 ">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="School ERP Logo"
              width={32}
              height={32}
            />
            <span className="text-xl font-bold text-gray-800">Lakshya</span>
          </div>

          <button
            onClick={() => setLoginvisble(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 text-center w-screen">
        <div className="w-full flex flex-col md:flex-row transition-all duration-500">
          {/* Left part */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
              Custom ERP for Efficient Education Management
            </h1>
            <p className="text-base md:text-lg mb-6 text-gray-700">
              Run your entire institute with Lakshya's custom education ERP.
              From schools to college, automate, digitize, and elevate your
              academic processes easily with a comprehensive ERP that offers
              personalized user experiences.
            </p>
            <a href="#cta">
              <button
                onClick={() => setLoginvisble(true)}
                className="bg-mybg4 text-white hover:bg-mybg3 hover:text-gray-900 py-3 px-8 rounded-full text-lg font-semibold transition-all duration-300"
              >
                Test and Explore
              </button>
            </a>
          </div>

          {/* Right part */}
          <div className="flex-1 p-6 md:p-12">
            <img
              className="w-full h-auto rounded-lg shadow-lg"
              src="/hero.jpg"
              alt="Education Management"
            />
          </div>
        </div>
      </section>

      {/* Portals  Section */}
      <ImageSlider />

      {isLoginVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          {/* Main Modal Container */}
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-[90%] max-w-md">
            {/* Close Button */}
            <button
              onClick={() => setLoginvisble(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-200"
              aria-label="Close"
            >
              <IoIosClose size={32} />
            </button>

            {/* Content */}
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
              <LoginPage />
            </div>
          </div>
        </div>
      )}

      {/* Why lakshya? Section */}
      <section className="why bg-mybg1">
        <div className="flex flex-col xl:flex-row flex-1 py-16 mx-4 gap-8">
          {/* Left Part */}
          <div className="flex flex-col justify-center w-full xl:w-1/2 gap-6 px-4">
            <div className="py-5">
              <h1 className="font-bold text-3xl mb-4">Why Lakshya?</h1>
              <p className="font-semibold text-balance text-lg">
                Lakshya's education ERP is tailored to fit your institute's
                unique requirements. Build apps that reflect your processes with
                minimal coding, or choose from our selection of prebuilt
                applications and customize as you scale.
              </p>
            </div>

            <div className="w-full xl:w-3/5 flex items-center justify-center">
              <div className="relative w-full xl:w-4/5 h-auto flex items-center justify-center">
                <Image
                  src="/LoginImage.png"
                  alt="Image"
                  layout="responsive" // Make image responsive
                  width={800} // Set the intrinsic width (aspect ratio)
                  height={500} // Set the intrinsic height (aspect ratio)
                  objectFit="cover" // Ensure the image covers the container without distorting
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Right Part */}
          <div className="flex flex-col w-full xl:w-1/2 gap-6 px-4">
            {/* Customizable */}
            <div className="py-3 flex items-start gap-4">
              <GiAutoRepair size={30} className="text-gray-600" />
              <div>
                <h3 className="font-bold text-2xl">Customizable</h3>
                <p className="font-semibold text-balance text-lg">
                  Lakshya's education ERP adapts to your unique requirements. It
                  works the way you do, ensuring a seamless fit for your
                  institution.
                </p>
              </div>
            </div>

            {/* All-in-One Solution */}
            <div className="py-3 flex items-start gap-4">
              <FaFileShield size={30} className="text-gray-600" />
              <div>
                <h3 className="font-bold text-2xl">All-in-One Solution</h3>
                <p className="font-semibold text-balance text-lg">
                  Run your educational institution from a single app. Manage
                  admissions, track attendance, handle event management,
                  streamline communications, plan courses, and more—all in one
                  place.
                </p>
              </div>
            </div>

            {/* Highly Integrable */}
            <div className="py-3 flex items-start gap-4">
              <LuHandshake size={30} className="text-gray-600" />
              <div>
                <h3 className="font-bold text-2xl">Highly Integrable</h3>
                <p className="font-semibold text-balance text-lg">
                  Easily integrate your services with our user-friendly
                  interface and automate tasks effortlessly.
                </p>
              </div>
            </div>

            {/* Effortless Data Migration */}
            <div className="py-3 flex items-start gap-4">
              <BsDatabaseFillCheck size={30} className="text-gray-600" />
              <div>
                <h3 className="font-bold text-2xl">
                  Effortless Data Migration
                </h3>
                <p className="font-semibold text-balance text-lg">
                  If you already have an existing database, our built-in tool
                  allows you to migrate your data instantly, saving you time and
                  effort.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}

      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-screen-xl mx-auto text-center space-y-4">
          <p className="text-lg font-semibold">
            &copy; 2024 <span className="text-yellow-500">Lakshya</span>. All
            rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
            >
              <i className="fab fa-facebook-f"></i>{" "}
              {/* You can replace this with an icon */}
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-400 hover:text-yellow-500 transition-colors duration-300"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
