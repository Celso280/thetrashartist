import { AuthContext } from "../context/AuthContext";
import React , {useEffect, useState, useContext} from 'react'
import axios from "axios";

function Modal({ isVisible, onClose, selectedArt }) {

const [sellerInfo, setSellerInfo] = useState({})

const context = useContext(AuthContext)

const getSeller = () => {
  
  axios.get(`http://localhost:8000/get-user/${selectedArt.user_id}`)
    .then(function (response) {
      setSellerInfo(response.data[0])
    })
    .catch(function (error) {
      console.log(error);
    });
};

const addToCart = () => {
  axios.post("http://localhost:8000/add-cart-item", {
        user_id: context.user.user_id,
        art_id: selectedArt.art_id,
        image_upload: selectedArt.upload_image,
        art_name: selectedArt.art_name,
        quantity: 1,
        price: selectedArt.price
      })
      .then(function (response) {
        
      })
      .catch(function (error) {
        
      });
}

useEffect(() => {
  if (isVisible) {
    getSeller()
  }
}, [selectedArt])

if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-1/4 flex flex-col'>
            <button 
            className='text-white text-xl place-self-end'
            onClick={() => onClose()}
            >X</button>    
            <div className='p-2 rounded bg-white'>
                  <img src={selectedArt.upload_image} alt=''/>
                  <p>Artist name: {`${sellerInfo.first_name} ${sellerInfo.last_name}`}</p>
                  <p>Email: {sellerInfo.email}</p>
                  <p>Contact: {sellerInfo.contact}</p>
                  <button 
                  className='bg-[#FFD700] w-full rounded-md'
                  onClick={addToCart}
                  >Add To Cart
                  </button>
            </div>
        </div>
    </div>
  )
}

export default Modal