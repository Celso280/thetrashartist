import React from 'react'
import Dropdown from '../Dropdown'
import { Link } from "react-router-dom";

function Categories() {
  return (
    <div className='m-1 p-1 mt-2'>
        <div className='hidden md:flex justify-around p-2 font-bold'>
            <button>ALL</button>
            <button><Link to='/electronicitem'>ELECTRONIC ITEM</Link></button>
            <button><Link to='/plastic'>PLASTIC</Link></button>
            <button><Link to='/paper'>PAPER</Link></button>
            <button><Link to='/fabric'>FABRIC</Link></button>
            <button><Link to='/wood'>WOOD</Link></button>
            <button><Link to='/glass'>GLASS</Link></button>
            <button><Link to='/styrofoam'>STYROFOAM</Link></button>
            <button><Link to='/others'>OTHERS</Link></button>  
        </div>  
        <div className='md:hidden'>
            <Dropdown/>
        </div>
    </div>
  )
}

export default Categories