import { AuthContext, AuthProvider } from "./context/AuthContext";
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
import GetArtFromDb from "./pages/admin_section/GetArtFromDb";
import axios from "axios";

function AppRoutes() {
  const {user, setUser} = useContext(AuthContext)
  
  if (typeof(user) == 'undefined') {
    
    const token = localStorage.getItem('jwt_token');
    if (typeof(token) !== 'undefined'){
      axios.post("http://localhost:8000/auth/verifyToken", {
          jwt_token:token
      })
      .then(function (response) {
        setUser(response.data)
        console.log(response, 'verify');
      })
      .catch(function (error) {
        console.log(error, 'front index');
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


