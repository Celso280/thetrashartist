import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { toast } from 'react-toastify';
import axios from 'axios';
import NavBar from '../components/NavBar';

function Cart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0)
  const context = useContext(AuthContext);
  
  useEffect(() => {
    getItemsFromCart()
  }, []);

  const getItemsFromCart = async () => {
    const response = await axios.get(`/all-cart-items/${context.user.user_id}`);
    setItems(response.data);
    getTotal(response.data)
  };

  const getTotal = (arr) => {
    console.log('logging arr and items', arr, items);
    const total = arr.reduce((accumulator, object) => {
      return accumulator + object.price
    }, 0)

    setTotal(total)
  }
  
  const getUser = async (id) => {
    await axios.delete(`http://localhost:8000/delete-cart-item/${id}`)
    toast.success(`Deleted successfully!`)
    getItemsFromCart()
  } 

  return (
    <div>
      <NavBar/>
      <div className='text-center'>
        <table className='m-auto mt-10'>
          <thead className='bg-[#2f2f2f] text-white'>
            <tr>
              <th className='px-10 py-1'>Image</th>
              <th className='px-10 py-1'>Name</th>
              <th className='px-10 py-1'>Quantity</th>
              <th className='px-10 py-1'>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td><img className='w-40 m-auto' src={item.image_upload} alt='' /></td>
                <td>{item.art_name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}<button className='w-5 ml-2 rounded-lg bg-rose-600 text-white' onClick={() => getUser(item.cart_id)}>X</button></td>
              </tr>
            ))}
          </tbody>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td className='bg-[#2f2f2f] text-white'>Total</td>
              <td className='bg-[#2f2f2f] text-white'>{total}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td><button>Checkout</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cart;
