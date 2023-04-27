import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Sell from "./pages/Sell";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import ArtistList from "./pages/profile_section/ArtistList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "connect",
    element: <Posts />,
  },
  {
    path: "sell",
    element: <Sell />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "login",
    element: <UserLogin />,
  },
  {
    path: "artist",
    element: <ArtistList />,
  },
  {
    path: "register",
    element: <Register />,
  },
  
]);

let root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


