import React from 'react'
import NavBar from '../components/NavBar'


function About() {
  return (
    <div>
        <NavBar />
          <div className='mt-3 m-auto w-2/4 shadow-md'>
            <img src='framedabout.png' alt=''/><br/>
          </div>
    </div>    
  )
}

export default About