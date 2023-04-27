import React from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

function UserLogin() {
  return (
    <div className="">
      <NavBar />
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto rounded-md sm:max-w-xl mt-10">
          <h1 className="text-3xl font-semibold text-center uppercase">
            Sign in
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <label
                for="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2 mt-2 bg-white text-slate-700 border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                for="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <span className="text-xs hover:underline hover:cursor-pointer hover:text-blue-700">Forgot password ?</span>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide transition-colors duration-200 transform bg-slate-200 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600 hover:text-white">
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs text-center">
            Don't have an account? | <span className="hover:text-blue-700 hover:cursor-pointer hover:underline"><Link to='/register'>Sign up</Link></span>
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
