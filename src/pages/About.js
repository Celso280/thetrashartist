import React from 'react'
import NavBar from '../components/NavBar'


function About() {
  return (
    <div>
        <NavBar />
        <div className='relative h-60 m-5 mt-2'>
          <div className='absolute w-80 left-[3rem] md:left-[13rem] lg:left-[30rem] top-1/4'>
            <p className='text-center font-semibold'>About this Project</p>
            <img src='apollo.webp' alt='apollo of mythic heroes'/><br/>
            <p>The purpose of this project is to support our Artists share their arts and to inspire others, to help our environment recover its beauty.</p>  
          </div>
        </div>
    </div>  
  )
}

export default About