import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from "../context/AuthContext";
import axios from 'axios'
import NavBar from '../components/NavBar'

function Cart() {

  const [items, setItems] = useState([])
  const context = useContext(AuthContext)

  useEffect(() => {
    getItemsFromCart()
 }, [])

  const getItemsFromCart = async() => {
    const response = await axios.get(`/all-cart-items/${context.user.user_id}`)
    setItems(response.data) 
 }

 console.log('logging items from Cart.js', items);  
  return (
    
    <div>
        <NavBar/>  
        <div>
          {items.map((item) => (
            <div className='w-80 h-60'>
              <table className='w-9/12 m-auto border-2 mt-20'>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
                <tr>
                  <td><img src={item.image_upload} alt='' /></td>
                  <td>{item.art_name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              </table>
            </div> 
          ))}            
        </div>
    </div>
  )
}

export default Cart