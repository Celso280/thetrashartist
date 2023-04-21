import React, {useState} from 'react'
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

function NavBar() {

    const [nav, setNav] = useState(false)

    function handleNav(){
        setNav(!nav)
    }

  return (
    <div className='pt-3 fixed w-full h-16 top-0 pr-4 font-bold z-50'>
        
        <div className='flex justify-between items-center mx-auto px-4 border-2 border-black'>
            <div className='flex h-20'>
                <img src='MyLogo.png' alt='TTA Logo'/>
                <h3 className='inline-block mt-6 text-2xl'><Link to='/home'>TheTrashArtist</Link></h3>
            </div>
            <ul className='hidden md:flex space-x-5 md:space-x-10'>
                <li className='p-4'><Link to='/about'>ABOUT</Link></li>
                <li className='p-4'><Link to='/artist'>ARTISTS</Link></li>
                <li className='p-4'><Link to='/connect'>POSTS</Link></li>
                <li className='p-4'><Link to='/sell'>SELL</Link></li>
                <div className='text-4xl self-center'>
                    <Link to='/login'><FaUserCircle className='mr-2'/></Link>
                </div>
            </ul> 
            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}      
            </div>
            
            {/* this is for side bar */}
            <div className={nav ? 'fixed p-3 left-[-5px] top-0 w-[60%] ease-in-out duration-500' : 'fixed left-[-100%]'}>
                <div className='flex bg-white h-10'>
                    <img src='MyLogo.png' alt='TTA Logo' className='ml-0'/>
                    <h3 className='mt-1 text-2xl'><Link to='/home'>TheTrashArtist</Link></h3>
                </div>
                <ul className='uppercase p-4 border h-screen bg-slate-500'>
                    <li className='p-4 hover:bg-white'><Link to='/about'>About</Link></li>
                    <li className='p-4 hover:bg-white'><Link to='/artist'>Artists</Link></li>
                    <li className='p-4 hover:bg-white'><Link to='/connect'>Posts</Link></li>
                    <li className='p-4 hover:bg-white'><Link to='/sell'>Sell</Link></li>
                    <div className='p-4 hover:bg-white text-4xl'>
                        <Link to='/login'><FaUserCircle/></Link>
                    </div>
                </ul>   
            </div>

        </div>
    </div>
    
  )
}

export default NavBar