import React, {useState, useEffect} from 'react'
import NavBar from '../../components/NavBar'
import ArtistProfile from './ArtistProfile'
import axios from 'axios'


function ArtistList() {

  // line 10-14 is use for exclusive end points
  // const config = {
  //   headers:{
  //     Authorization: `Bearer ${localStorage.getItem('jwt_token')}`
  //   }
  // };

  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [])
  
  const getUsers = async() => {
    // you can insert a config variable after the '/all-users' to make it only accessible to those who have JWT token
    const response = await axios.get('/all-artists')
    
    setUsers(response.data)
    
  }

  return (
    <div>
      <NavBar />
      <div className='flex justify-evenly flex-wrap p-2 mt-10'>

      {users.map((user) => {
        return(
          <ArtistProfile xxxx={user}/>
        )     
      })}

      </div>
    </div>
  )
}

export default ArtistList