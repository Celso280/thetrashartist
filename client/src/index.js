// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import About from "./pages/About";
// import Admin from "./pages/Admin";
// import Sell from "./pages/Sell";
// import Home from "./pages/Home";
// import UserLogin from "./pages/UserLogin";
// import ArtistList from "./pages/profile_section/ArtistList";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Register from "./pages/Register";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AuthContext, AuthProvider } from "./context/AuthContext";
// import GetArtFromDb from "./pages/admin_section/GetArtFromDb";



// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "about",
//     element: <About />,
//   },
//   {
//     path: "connect",
//     element: <GetArtFromDb />,
//   },
//   {
//     path: "sell",
//     element: <Sell />,
//   },
//   {
//     path: "home",
//     element: <Home />,
//   },
//   {
//     path: "login",
//     element: <UserLogin />,
//   },
//   {
//     path: "artist",
//     element: <ArtistList />,
//   },
//   {
//     path: "register",
//     element: <Register />,
//   },
  
// ]);

// let root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <AuthProvider>
//         {/* if (userContext is blank, check if localstorage has jwt if JWT is present then send JWT to backend, backend uses jwt.verify() to make sure that token has not been tampered with. When verified backend with response with email, response and role, then redirect to home. If JWT is not present redirect to login) */}
//         <ToastContainer/>
//         <RouterProvider router={router} />
//     </AuthProvider> 
//   </React.StrictMode>
// );

import React, {useContext} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Sell from "./pages/Sell";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import ArtistList from "./pages/profile_section/ArtistList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext, AuthProvider } from "./context/AuthContext";
import GetArtFromDb from "./pages/admin_section/GetArtFromDb";
import axios from "axios";

function AppRoutes() {
  const {user, setUser} = useContext(AuthContext)
  // if (user)
  

  if (typeof(user) == 'undefined') {
    
    const token = localStorage.getItem('jwt_token');
    if (typeof(token) !== 'undefined'){
      axios.post("http://localhost:8000/auth/verifyToken", {
          jwt_token:token
      })
      .then(function (response) {
        console.log(response);
        setUser(response)
      })
      .catch(function (error) {
        console.log('Not logged in');
      });
    }
}
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="connect" element={<GetArtFromDb />} />
      <Route path="sell" element={<Sell />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<UserLogin />} />
      <Route path="artist" element={<ArtistList />} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

function Root() {

  return (
    <React.StrictMode>
      <AuthProvider>
        <ToastContainer />
          <Router>
            <AppRoutes />
          </Router>
      </AuthProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);


