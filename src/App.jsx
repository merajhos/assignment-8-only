import React from "react";
import { useLoaderData } from "react-router";
import Home from "./app/Home";
function App() {
  const data = useLoaderData();

  return (
    <div className="bg-base-200">
      <div className="hero py-5">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              We Build <span className="text-[#9F62F2]">Productive </span>
              Apps
            </h1>
            <p className="py-6 text-gray-700">
              At HERO.IO, we craft innovative apps designed to make everyday
              life simpler, smarter, and more exciting.Our goal is to turn your ideas into digital experiences that truly make an impact.
            </p>
            <div className="gap-15  w-full flex justify-center">
              <button className="btn ">
                <i class="fa-brands fa-google-play text-green-400"></i> Google Play
              </button>
              <button className="btn ">
                <i class="fa-brands fa-app-store-ios text-blue-500"></i>App  Store
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center ">
        <img src="/assets/hero.png" alt="" />
      </div>

      <div className="py-10 bg-linear-to-br from-[#632EE3] to-[#9F62F2] text-white">
        <h1 className="text-3xl font-bold text-center mb-10">
          Trusted by Millions, Built for You
        </h1>
        <div className="stats stats-horizontal justify-center flex mx-5 gap-10">
          <div>
            <p className="text-sm">Total Downloads</p>
            <h1 className="text-4xl font-bold py-2">20.6M</h1>
            <p className="text-sm">21% more than last month</p>
          </div>
          <div>
            <p className="text-sm">Total Reviews</p>
            <h1 className="text-4xl font-bold py-2">906K</h1>
            <p className="text-sm">46% more than last month</p>
          </div>
          <div>
            <p className="text-sm">Active Apps</p>
            <h1 className="text-4xl font-bold py-2">132+</h1>
            <p className="text-sm">31 more will launch</p>
          </div>
        </div>
      </div>

      <div>
        <div>
          <h1 className="text-3xl font-bold text-center my-10">
            Trending apps
          </h1>
          <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-5 pb-10  justify-items-center">
            {data.map((homes) => (
              <Home key={homes.id} homes={homes}></Home>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
