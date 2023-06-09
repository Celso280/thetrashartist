import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import NavBar from '../components/NavBar'

function Order() {

    const [orders, setOrders] = useState([])
    
    useEffect(() => {
        getOrders()
      }, [])

    const getOrders = async() => {
        const response = await axios.get('/get-orders/Processing')
        setOrders(response.data)
      }
      
    const handleOrderStatus = async (status, id) => {
      await axios.put(`/update-order-status/${id}`, {
      status:status
    })
    getOrders()
    toast.success(`Order status changed successfully!`)
  }


  return (
    <div>
        <NavBar/>
        <table className='m-auto mt-20 text-center border-2 border-black p-2'>
            <tr className='bg-sky-400'>
                <th className='py-2 px-5'>ORDER ID</th>
                <th className='py-2 px-5'>BUYER</th>
                <th className='py-2 px-5'>ADDRESS</th>
                <th className='py-2 px-5'>EMAIL</th>
                <th className='py-2 px-5'>CONTACT</th>
                <th className='py-2 px-5'>ART NAME</th>
                <th className='py-2 px-5'>PRICE</th>
                <th className='py-2 px-5'>QUANTITY</th>
                <th className='py-2 px-5'>TRANSACTION</th>
            </tr>
                {orders.map((order) => (
                <tr>
                    <td>{order.order_id}</td>
                    <td>{`${order.first_name} ${order.last_name}`}</td>
                    <td>{order.location}</td>
                    <td>{order.email}</td>
                    <td>{order.contact}</td>
                    <td>{order.art_name}</td>
                    <td>{order.price}</td>
                    <td>{order.quantity}</td>
                    {/* <button className='w-5 ml-2 rounded bg-rose-500' onClick={() => deleteOrder(order.order_id)}>X</button> */}
                    <td>
                      <button 
                      className='rounded bg-sky-500 text-white p-1'
                      onClick={() => handleOrderStatus('Successed', order.order_id)}>Successed</button>
                      <button 
                      className='rounded bg-rose-500 text-white p-1'
                      onClick={() => handleOrderStatus('Cancelled', order.order_id)}>Cancelled</button></td>
                    </tr>
                ))}     
        </table>
    </div>
  )
}

export default Order