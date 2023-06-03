import { AuthContext } from "../context/AuthContext";
import React, {useContext} from 'react'
import { toast } from 'react-toastify';
import axios from "axios";


function Checkout({isVisible, onClose, items, total}) {

    const context = useContext(AuthContext)
    if (!isVisible) return null;

    const addOrder = () => {
        const promises = items.map((item) => {
          return axios.post("http://localhost:8000/add-order", {
            user_id: context.user.user_id,
            art_id: item.art_id,
            quantity: 1,
            status: 'Processing'
          });
        });
      
        Promise.all(promises)
          .then(function (responses) {
            // handle responses if needed
            toast.success('Order successful the admin will notify the artist.');
          })
          .catch(function (error) {
            // handle error if needed
          });
      };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
        <div className='w-[600px] flex flex-col'>
            <button className='text-white text-xl place-self-end' onClick={() => onClose()}>X</button>
            <div className='bg-white p-2 rounded flex flex-col'>
                <p className="bg-sky-400 text-center rounded text-white">Checkout information here</p>
                <p>{`Name: ${context.user.first_name} ${context.user.last_name}`}</p>
                <p>Delivery Address: {context.user.location}</p>
                <p>Total amount: {total}</p>
                <p className="mb-5">Mode of payment: Cash on delivery</p>
                <button 
                className="bg-sky-400 text-center w-30 place-self-center rounded text-white p-2"
                onClick={() => addOrder()}
                >Confirm order</button>
            </div>
        </div>
    </div>
  )
}

export default Checkout