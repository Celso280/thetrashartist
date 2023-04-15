import React, {useState} from 'react'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";


function Connect() {
  const [nav, setNav] = useState(false)

  function handleNav(){
    setNav(!nav)
  }

  return (
    <div className='flex justify-between items-center h-24 mx-auto px-4'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>TheTrashArtist</h1>
      <ul className='hidden md:flex'>
        <li className='p-4'>About</li>
        <li className='p-4'>Artists</li>
        <li className='p-4'>Posts</li>
        <li className='p-4'>Sell</li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>

          {!nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
          
      </div>
      <div className={!nav ? 'fixed left-0 top-0 w-[60%] border-r border-r-gray-900 h-full ease-in-out duration-500' : 'fixed left-[-100%]'}>
      <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>TheTrashArtist</h1>
      <ul className='uppercase p-4'>
        <li className='p-4'>About</li>
        <li className='p-4'>Artists</li>
        <li className='p-4'>Posts</li>
        <li className='p-4'>Sell</li>
      </ul>
      </div>
    </div>

    
    
  )
}

export default Connect