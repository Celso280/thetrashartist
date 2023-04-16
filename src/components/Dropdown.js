import React, { useState } from 'react'
import { AiOutlineCaretUp, AiOutlineCaretDown} from 'react-icons/ai'
import Lists from '../components/Lists'

function Dropdown() {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative flex flex-col items-center rounded-lg my-0'>
      <button onClick={() => setIsOpen((prev) => !prev)} className='w-full flex items-center border-4 border-transparent active:border-white duration-500 bg-slate-200'>
        Select your category
        {!isOpen ? (
          <AiOutlineCaretDown className='h-8' />
        ):(
          <AiOutlineCaretUp className='h-8'/>
        )}
        
      </button>

      {isOpen && (
        <div className='absolute mt-11 flex flex-col items-start rounded-lg p-2 bg-slate-200 left-2 border-2 border-white'>
          {Lists.map((list, i)=>(
            <div className='p-2 hover:bg-white cursor-pointer rounded-r-lg border-l-transparent hover:border-l-black border-l-4 w-full' key={i}>
              <h3>{list.category}</h3>
            </div>
          ))}
        </div>
      )}
         
    </div>
  )
}

export default Dropdown