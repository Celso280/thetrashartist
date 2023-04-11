import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className='flex justify-between h-16 bg-white'>
        <div className='flex'>
            <img src='MyLogo.png' alt='TTA Logo' className='bg-auto ml-0'/>
            <h3 className='inline-block mt-4 text-2xl'><Link to='/home'>TheTrashArtist</Link></h3>
        </div>
         <div>
            <div className='flex space-x-24 mt-3 mr-3 ml-10 p-1 bg-slate-200'>
                <div className='ml-10 mt-1.5 space-x-24'>
                    <button><Link to='/about'>About</Link></button>
                    <button><Link to='/artist'>Partner Artists</Link></button>
                    <button><Link to='/connect'>Chat Box</Link></button>
                    <button><Link to='/sell'>Sell</Link></button>
                </div>
                <div className='text-4xl'><Link to='/login'><FaUserCircle/></Link></div>
            </div>
        </div>  
    </div>
  )
}

export default NavBar