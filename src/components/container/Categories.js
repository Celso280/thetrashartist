import React from 'react'
import Dropdown from '../Dropdown'

function Categories() {
  return (
    <div className='m-1 p-1 mt-2 bg-white'>
        <div className='hidden md:flex justify-around p-2 bg-slate-200'>
            <button>All</button>
            <button>Electronic Items</button>
            <button>Plastic</button>
            <button>Paper</button>
            <button>Cloth</button>
            <button>Wood</button>
            <button>Glass</button>
            <button>Styrofoam</button>
            <button>Others</button>  
        </div>  
        <div className='md:hidden'>
            <Dropdown/>
        </div>
    </div>
  )
}

export default Categories