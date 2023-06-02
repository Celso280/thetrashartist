import React, {useState, useContext} from 'react'
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";

    
function NavBar() {

    const context = useContext(AuthContext)
    const [nav, setNav] = useState(false)
    const navigate = useNavigate()

    function handleNav(){
        setNav(!nav)
    }

  return (
    <div className='pt-3 h-9 fixed w-full top-0 pr-4 font-bold z-50'>
        {/* ? if undefined not continue line 31 */}
        
        <div className='flex justify-between items-center mx-auto px-4'>
            <div className='flex h-24 scale-150'>
                <img src='colorful.png' alt='TTA Logo'/>
                
            </div>
            <ul className='hidden md:flex md:space-x-2 lg:space-x-10'>
                
                <li className='p-4'><Link to='/home'>HOME</Link></li>
                <li className='p-4'><Link to='/about'>ABOUT</Link></li>
                <li className='p-4'><Link to='/artist'>ARTISTS</Link></li>
                {context.user?.role==='artist' && <li className='p-4'><Link to='/sell'>SELL</Link></li>}
                {context.user?.role==='admin' && <li className='p-4'><Link to='/connect'>APPLICATION</Link></li>}
                {context.user?.role==='admin' && <li className='p-4'><Link to='/order'>ORDERS</Link></li>}
                <li className='p-4'><Link to='/account'>ACCOUNT</Link></li>
                {context.user?.role==='buyer' && <li className='p-4 text-2xl'><Link to='/cart'><AiOutlineShoppingCart/ ></Link></li>} 
                <div className='self-center bg-slate-700 rounded-lg text-white px-2 py-1'>
                    {context.user ? <button onClick={() => {
                        context.setUser(undefined)
                        localStorage.setItem('jwt_token',undefined)
                        navigate("/login");
                    }}>Logout</button> : <Link to='/login'><button>Login</button></Link>}
                </div>
            </ul> 
            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}      
            </div>
            
            {/* this is for side bar */}
            <div className={nav ? 'fixed p-3 left-[-5px] top-[-12px] w-[60%] ease-in-out duration-500' : 'fixed left-[-100%]'}>
                <ul className='uppercase p-4 h-screen bg-slate-100'>
                    <li className='p-4 hover:bg-slate-100 hover:scale-110'><Link to='/home'>Home</Link></li>
                    <li className='p-4 hover:bg-slate-100 hover:scale-110'><Link to='/about'>About</Link></li>
                    <li className='p-4 hover:bg-slate-100 hover:scale-110'><Link to='/artist'>Artists</Link></li>
                    {context.user?.role==='artist' && <li className='p-4'><Link to='/sell'>Sell</Link></li>}
                    {context.user?.role==='admin' && <li className='p-4'><Link to='/connect'>APPLICATION</Link></li>}
                    {context.user?.role==='admin' && <li className='p-4'><Link to='/order'>ORDERS</Link></li>}
                    <li className='p-4'><Link to='/account'>ACCOUNT</Link></li>
                    {context.user?.role==='buyer' && <li className='p-4 text-2xl'><Link to='/cart'><AiOutlineShoppingCart/ ></Link></li>}
                    <div className='px-2 py-1 w-fit hover:scale-110 bg-slate-700 rounded-lg text-white'>
                        {context.user ? <button onClick={() => {
                            context.setUser(undefined)
                            localStorage.setItem('jwt_token',undefined)
                            navigate("/login");
                        }}>Logout</button> : <Link to='/login'><button>Login</button></Link>}
                    </div>
                </ul>   
            </div>

        </div>
    </div>
    
  )
}

export default NavBar