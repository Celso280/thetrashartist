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
        const response = await axios.get('/get-orders')
        setOrders(response.data)
      }
      
    const deleteOrder = async (id) => {
    await axios.delete(`http://localhost:8000/delete-order/${id}`)
    toast.success(`Deleted successfully!`)
    getOrders()
    } 

  return (
    <div>
        <NavBar/>
        <table className='m-auto mt-20 text-center border-2 border-black p-2'>
            <tr className='bg-sky-400'>
                <th className='py-2 px-5'>ORDER ID</th>
                <th className='py-2 px-5'>NAME</th>
                <th className='py-2 px-5'>ADDRESS</th>
                <th className='py-2 px-5'>EMAIL</th>
                <th className='py-2 px-5'>CONTACT</th>
                <th className='py-2 px-5'>ART NAME</th>
                <th className='py-2 px-5'>PRICE</th>
                <th className='py-2 px-5'>QUANTITY</th>
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
                    <td>{order.quantity}<button className='w-5 ml-2 rounded bg-rose-500' onClick={() => deleteOrder(order.order_id)}>X</button></td>
                    </tr>
                ))}     
        </table>
    </div>
  )
}

export default Order