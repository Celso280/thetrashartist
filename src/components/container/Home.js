import React, { useState } from 'react'
import { AiOutlineCaretUp, AiOutlineCaretDown} from 'react-icons/ai'
import arts from './Arts'


function Home() {

   const [isOpen, setIsOpen] = useState(false)
   const [homeArray, setHomeArray] = useState(
      arts
   )
    
const renderCategories = () => {
   const categoriesArr = [
      'Electronic Item',
      'Fabric',
      'Glass',
      'Paper',
      'Plastic',
      'Wood',
      'Styrofoam',
      'Others' 
   ]
   
   const categolist = categoriesArr.map((category, index) => (
      <div className='text-sm mx-5 my-1 px-1 md:mx-1 border-2 rounded-lg border-black ring-2 ring-slate-200 hover:scale-110'>
         <button className='my-2 uppercase' onClick={() => {
         filterItems(category)
         }}>{category}</button>
      </div>
   ))

   return (
      <>
         <button className='text-sm my-1 ml-5 md:ml-1 mr-1 lg:ml-14 w-16 border-2 rounded-lg border-black ring-2 ring-slate-200 hover:scale-110' onClick={() => {
            setHomeArray(arts)
         }}>ALL</button>
         {categolist}
      </>
   )
}

const filterItems = (category) => {
   const filteredArts = arts.filter((art) => {
      return(
         art.category === category   
      )  
   })
   setHomeArray(filteredArts)
 }

  return (
    <div>
      <div className='hidden lg:flex font-semibold mt-5'>
         {renderCategories()}    
      </div>

      <div className='w-60 border-2 border-black rounded-md ml-14'>
         <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
            </div>

            <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search art by ID" /> 
         </div>
      </div>
      
      <div className='flex relative lg:hidden ml-20'>
         <button onClick={() => setIsOpen((prev) => !prev)} className='ml-5 w-full flex items-center'>
         CHOOSE CATEGORY
         {!isOpen ? (
            <AiOutlineCaretUp className='h-8' />
         ):(
            <AiOutlineCaretDown className='h-8'/>
         )}
         </button>

         {isOpen && (
            <div className='absolute flex flex-col items-start my-10 rounded-lg bg-white'>
               {renderCategories()} 
            </div>
               )}
      </div>
      
      <div className='flex font-semibold flex-wrap justify-evenly max-h-screen overflow-auto px-10 mt-5'>
            {homeArray.map((art, index) => ( 
               <div className='border-2 border-black mb-3 hover:scale-95'>
                  <div>
                     <img className='w-60 h-44' src={art.image} alt='' />
                  </div>
                  <div className='p-2 text-sm ml-4'>
                     <p>Category: {art.category} </p>
                     <p>Art name: {art.artName} </p>
                     <p>Price: {art.price} </p>
                     <p>Location: {art.location} </p>
                  </div>
               </div>
            ))}
      </div>
    </div>
  )
}

export default Home