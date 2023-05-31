import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";
import FormData from 'form-data';
import { toast } from 'react-toastify';


function Sell() {

  // const [type, setType] = useState([])
  const [artUpload, setArtUpload] = useState({})
  const navigate = useNavigate()
  const context = useContext(AuthContext)

  const addArt = (e) => {
    e.preventDefault();
    console.log(context.user.user_id, 'this is context user check');
    axios.post("http://localhost:8000/add-art", {
        category: artUpload.category,
        art_name: artUpload.artName,
        price: artUpload.price,
        location: artUpload.location,
        description: artUpload.description,
        upload_image: artUpload.uploadImage,
        user_id: context.user.user_id
      })
      .then(function (response) {
        navigate('/home')
        toast.success(`Art added successfully please wait for the approval of the admin!`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const handleChange = (data) => {
  //   setType(() => {
  //     if (type.includes(data)){
  //       console.log(data);
  //       const test = type.filter((plant) => plant !== data);
  //       return test
  //     }
  //     return [...type, data];
  //   }
  //   );
  // }

  const handleCategory = (e) => {
    let value = e.target.value
    setArtUpload({
      ...artUpload, category: value
    })
    console.log(artUpload);
  };

  const handleArtName = (e) => {
    let value = e.target.value;
    setArtUpload({
      ...artUpload, artName: value
    })
    
  };

  const handlePrice = (e) => {
    let value = e.target.value;
    setArtUpload({
      ...artUpload, price: value
    })
    console.log(artUpload);
  };

  const handleLocation = (e) => {
    let value = e.target.value;
    setArtUpload({
      ...artUpload, location: value
    })
    console.log(artUpload);
  };

  const handleDescription = (e) => {
    let value = e.target.value;
    setArtUpload({
      ...artUpload, description: value
    })
    console.log(artUpload);
  };

  const handleImage = (e) => {
    
    const file = e.target.files[0];
    
    const formData = new FormData();
    formData.append('file', file);
    
    axios.post('http://localhost:8000/upload-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(`this is image upload ${res.data}`);
        setArtUpload({
          ...artUpload, uploadImage: res.data.url
        })       
      })
      .catch(error => {
        console.error(error);        
      });
    };

  return (
    <div>
      <NavBar />
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto rounded-md sm:max-w-xl mt-10">
          <form className="mt-6" onSubmit={addArt}>
            <div>
              <p className="font-semibold">Select your art categories:</p>

                <input type="radio" name="category" id="electronic" value="Electronic"
                  onChange={handleCategory}/>
                <label for="electronic">Electronic</label><br/>

                <input type="radio" name="category" id="fabric" value="Fabric"
                  onChange={handleCategory}/>
                <label for="fabric">Fabric</label><br/>

                <input type="radio" name="category" id="glass" value="Glass"
                  onChange={handleCategory}/>
                <label for="glass">Glass</label><br/>

                <input type="radio" name="category" id="paper" value="Paper"
                  onChange={handleCategory}/>
                <label for="paper">Paper</label><br/>

                <input type="radio" name="category" id="plastic" value="Plastic"
                  onChange={handleCategory}/>
                <label for="plastic">Plastic</label><br/>

                <input type="radio" name="category" id="wood" value="Wood"
                  onChange={handleCategory}/>
                <label for="wood">Wood</label><br/>

                <input type="radio" name="category" id="styrofoam" value="Styrofoam"
                  onChange={handleCategory}/>
                <label for="styrofoam">Styrofoam</label><br/>

                <input type="radio" name="category" id="others" value="Others"
                  onChange={handleCategory}/>
                <label for="others">Others</label><br/><br/>

            </div>
            <div className="mb-2">
              <label
                for="text"
                className="block text-sm font-semibold text-gray-800"
              >
                Art Name
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleArtName}
                // value={artUpload.artName}
              />
            </div>
            <div className="mb-2">
              <label
                for="number"
                className="block text-sm font-semibold text-gray-800"
              >
                Price
              </label>
              <input
                type="number"
                className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handlePrice}
                // value={artUpload.price}
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
                // value={artUpload.location}
              />
            </div>
            <div className="mb-2">
              <label
                for="text"
                className="block text-sm font-semibold text-gray-800"
              >
                Description
              </label>
              <input
                type="text"
                className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={handleDescription}
              />
            </div>

            <div className="mb-2">
              
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files">Upload image</label>
              <input class="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple 
              onChange={handleImage} />
              
            </div>
            
            <div className="mt-6">
              <button 
                className="w-full px-4 py-2 tracking-wide transition-colors duration-200 transform bg-slate-200 rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600 hover:text-white"
                type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sell;
