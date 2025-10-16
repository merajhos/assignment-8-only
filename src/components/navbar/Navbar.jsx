import React from "react";
import { Link, NavLink } from "react-router";
const Navbar = () => {

  return (
    
<div class="navbar bg-base-100 shadow-sm px-5 md:px-10 lg:px-20">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost sm:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabindex="0"
        class="menu menu-xl  dropdown-content bg-base-100 rounded-box z-1 mt-3 w-96 p-2 shadow">
        <li> <Link to="/">Home</Link></li>
        <li> <Link to="/app">Apps</Link></li>
         <li> <Link to="/installation">Installation</Link></li>
      </ul>
    </div>
    <img src="/assets/logo.png" alt="" className="w-8"/>
    <a class="btn btn-ghost text-xl"> <Link to="/">Apps . iO</Link></a>
  </div>
  <div class="navbar-center hidden sm:flex ">
    <ul class="menu menu-horizontal px-1 gap-3">
      <li> <NavLink to="/"className={({ isActive }) =>
    `text-black ${
      isActive
        ? 'bg-[#9F62F2] shadow-md text-white'
        : 'text-gray-600 hover:bg-gray-100'
    }`
  }
>Home</NavLink></li>

      <li><NavLink to="/app"
  className={({ isActive }) =>
    `text-black ${
      isActive
        ? 'bg-[#9F62F2] shadow-md text-white'
        : 'text-gray-600 hover:bg-gray-100'
    }`
  }
>App</NavLink></li>

      <li><NavLink to="/installation"
  className={({ isActive }) =>
    `text-black ${
      isActive
        ? 'bg-[#9F62F2] shadow-md text-white'
        : 'text-gray-600 hover:bg-gray-100'
    }`
  }
> Installation</NavLink></li>
    </ul>
  </div>
  <div class="navbar-end ">
    <a href="https://github.com/merajhos" target="blank" class="btn bg-linear-to-br from-[#632EE3] to-[#9F62F2] rounded-md text-white"><i class="fa-brands fa-github"></i> contribute</a>
  </div>
</div>
  );
};

export default Navbar;

