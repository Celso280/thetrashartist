import React from 'react'
import NavBar from '../components/NavBar'


function About() {
  return (
    <div>
        <NavBar />
        <div className='relative h-60 m-5 mt-2'>
          <div className='absolute w-80 left-[3rem] md:left-[13rem] lg:left-[30rem] top-1/4 shadow-md p-2 bg-white'>
            <p className='text-center font-semibold'>ABOUT THIS PROJECT</p><br/>
            <img src='fish.webp' alt='apollo of mythic heroes'/><br/>
            <p>Thetrashartist web app is designed to help users to buy and sell their arts. The app is intuitive and user-friendly, allowing users to easily search for different arts based on various criteria such as electronic, fabric, glass, paper, plastic, wood, styrofoam and others.</p>  
          </div>
        </div>
    </div>  
  )
}

export default About