import React from "react";
import { Link } from "react-router";

const Home = ({ homes }) => {
  return (
    <Link to={`/appDetails/${homes.id}`} className= "block">
      <div className="">
        <div className="card bg-base-100   shadow-sm">
          <figure className="">
            <img
              src={homes.image}
              alt={homes.title}
              className="w-[300px] h-52 px-10 pt-4 "
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Company : {homes.companyName}</h2>
            <div className="flex justify-between">
              <div className="badge bg-emerald-50 font-bold text-emerald-500">
                <i class="fa-solid fa-arrow-down "></i>{" "}
                {homes.downloads / 1000000} M
              </div>
              <div className="badge bg-red-50 font-bold text-red-500 ">
                <i class="fa-solid fa-star"></i>
                {homes.rating}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Home;
