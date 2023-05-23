import React , {useEffect, useState} from 'react'
import axios from "axios";

function Modal({ isVisible, onClose, selectedArt }) {

const [sellerInfo, setSellerInfo] = useState({})

const getSeller = () => {
  
  axios.get(`http://localhost:8000/get-user/${selectedArt.user_id}`)
    .then(function (response) {
      setSellerInfo(response.data[0])
    })
    .catch(function (error) {
      console.log(error);
    });
};

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
                  <img src={selectedArt.upload_image} alt='' />
                  <p>Artist name: {`${sellerInfo.first_name} ${sellerInfo.last_name}`}</p>
                  <p>Email: {sellerInfo.email}</p>
                  <p>Contact: {sellerInfo.contact}</p>
            </div>
        </div>
    </div>
  )
}

export default Modal