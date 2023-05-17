import React, {useState, useEffect} from 'react'
import NavBar from '../../components/NavBar'
import Posts from '../Admin'
import axios from 'axios'


function GetArtFromDb() {

  const [arts, setArts] = useState([])

  useEffect(() => {
    getArts()
  }, [])
  
  const getArts = async() => {
    // you can insert a config variable after the '/all-users' to make it only accessible to those who have JWT token
    const response = await axios.get('/all-arts/pending')
    
    setArts(response.data)

  }

  return (
    <div>
      <NavBar />
      <div className='flex justify-evenly flex-wrap p-2 mt-10'>
      
        {arts.map((art) => {
            return(
            <Posts art={art}/>
            )     
        })}

      </div>
    </div>
  )
}

export default GetArtFromDb
