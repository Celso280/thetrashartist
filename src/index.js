import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import About from "./pages/About";
import Connect from "./pages/Connect";
import Sell from "./pages/Sell";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import ArtistList from "./pages/profile_section/ArtistList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    element: <Connect />,
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
]);

let root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
