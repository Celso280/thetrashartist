import React, {useState, useEffect} from 'react'
import NavBar from '../../components/NavBar'
import ArtistProfile from './ArtistProfile'
import axios from 'axios'


function ArtistList() {

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
      <NavBar />
      <div className='flex justify-evenly flex-wrap p-2 mt-10'>

      {users.map((user) => {
        return(
          <ArtistProfile user={user}/>
        )     
      })}

      </div>
    </div>
  )
}

export default ArtistList