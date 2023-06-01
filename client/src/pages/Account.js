import React, {useEffect, useState, useContext} from 'react'
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from 'axios'
import NavBar from '../components/NavBar'

function Account() {

  const context = useContext(AuthContext)
  const [account, setAccount] = useState([])

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async() => {
    const response = await axios.get(`http://localhost:8000/get-user/${context.user.user_id}`)
    setAccount(response.data)
  }
  
  return (
    <div>
        <NavBar/>
        <div className='w-1/3 mt-20 m-auto overflow-hidden rounded p-2 border-2 border-black'>
          <div className='flex justify-between rounded text-white p-1 bg-sky-500'>
            <p>Account Information</p>
            <button><Link to='/edit' state={{account:account[0]}}>Edit</Link></button>
          </div>     
          {account.map((acc) =>(
            <div>
              <p>Full Name: {`${acc.first_name} ${acc.last_name}`}</p>
              <p>Email: {acc.email}</p>
              <p>Password: {acc.password}</p>
              <p>Location: {acc.location}</p>
              <p>Contact: {acc.contact}</p>
              <p>Bio: {acc.bio}</p>
              <p>Role: {acc.role}</p>
              <img className='w-80 m-auto' src={acc.profile_picture} alt=''/>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Account