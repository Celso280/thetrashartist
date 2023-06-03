import { AuthContext } from "../context/AuthContext";
import React , {useEffect, useState, useContext} from 'react'
import { toast } from 'react-toastify';
import axios from "axios";
import { FcIphone, FcGoogle, FcBusinessman } from "react-icons/fc";

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
      toast.success('Added to cart successfully')
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
                  <p className="flex items-center"><FcBusinessman className="mr-1"/>{`${sellerInfo.first_name} ${sellerInfo.last_name}`}</p>
                  <p className="flex items-center"><FcGoogle className="mr-1"/>{sellerInfo.email}</p>
                  <p className="flex items-center"><FcIphone className="mr-1"/>{sellerInfo.contact}</p>
                  <button 
                  className='bg-sky-400 w-full rounded text-white'
                  onClick={addToCart}
                  >Add To Cart
                  </button>
            </div>
        </div>
    </div>
  )
}

export default Modal