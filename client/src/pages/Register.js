import React, { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import FormData from 'form-data';

function BuyerReg() {
 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [bio, setBio] = useState("");
  const [role, setRole] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isUploading, setIsUploading] = useState(false)

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  const handleContact = (e) => {
    setContact(e.target.value);
  };

  const handleBio = (e) => {
    setBio(e.target.value);
  };
 
  const handleRole = (e) => {
    setRole(e.target.value);
  };


  const handleProfilePicture = (e) => {
    setIsUploading(true)
    const file = e.target.files[0];
    
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:8000/upload-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(res.data);
        setProfilePicture(res.data.url)
        setIsUploading(false)
      })
      .catch(error => {
        console.error(error);
        setIsUploading(false)
      });
    };

  const addUser = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/add-user", {
        first_name: firstName,
        last_name: lastName,
        profile_picture: profilePicture,
        bio: bio,
        email: email,
        password: password,
        location: location,
        contact: contact,
        role: role,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBar />
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto rounded-md sm:max-w-xl mt-10">
          <form className="mt-6" onSubmit={addUser}>
            <div className="mb-2">
              <label
                for="text"
                className="block text-sm font-semibold text-gray-800"
              >
                First Name
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleFirstName}
              />
            </div>
            <div className="mb-2">
              <label
                for="text"
                className="block text-sm font-semibold text-gray-800"
              >
                Last Name
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleLastName}
              />
            </div>
            <div className="mb-2">
              <label
                for="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleEmail}
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
                onChange={handlePassword}
              />
            </div>
            <div className="mb-2">
              <label
                for="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                for="text"
                className="block text-sm font-semibold text-gray-800"
              >
                Location
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleLocation}
              />
            </div>
            <div className="mb-2">
              <label
                for="text"
                className="block text-sm font-semibold text-gray-800"
              >
                Contact Number
              </label>
              <input
                type="number"
                className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleContact}
              />
            </div>

            <div className="mb-2">
              <label
                for="text"
                className="block text-sm font-semibold text-gray-800"
              >
                Bio
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleBio}
              />
            </div>

            <div className="mb-2">
              <p>Please select a role :</p>
              <input
                type="radio"
                name="role"
                id="buyer"
                value="buyer"
                onChange={handleRole}
              />
                <label for="buyer">Buyer</label>
              <br />
              <input
                type="radio"
                name="role"
                id="artist"
                value="artist"
                onChange={handleRole}
              />
                <label for="artist">Artist</label>
              <br />
            </div>

            <div className="mb-2">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="multiple_files"
              >
                Upload profile picture
              </label>
              <input
                class="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="multiple_files"
                type="file"
                multiple
                onChange={handleProfilePicture}
              />
            </div>

            <div className="mt-6">
              <button
                className="w-full px-4 py-2 tracking-wide transition-colors duration-200 transform bg-slate-200 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600 hover:text-white"
                type="submit"
                disabled = {isUploading}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BuyerReg;
