import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Sell from "./pages/Sell";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import ArtistList from "./pages/profile_section/ArtistList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./context/AuthContext";
import GetArtFromDb from "./pages/admin_section/GetArtFromDb";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "connect",
    element: <GetArtFromDb />,
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
    <AuthProvider>

        <ToastContainer/>
        <RouterProvider router={router} />
      
    </AuthProvider> 
  </React.StrictMode>
);


