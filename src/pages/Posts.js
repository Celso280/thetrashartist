import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios'

function Posts() {
  
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [])
  
  const getUsers = async() => {
    const response = await axios.get('/all-users')
    setUsers(response.data)
  }

  return (
    <div>
      <NavBar/>
      <div>
        {JSON.stringify(users)}
      </div>
    </div>
  )
}

export default Posts