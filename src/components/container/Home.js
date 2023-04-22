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
         <button className='text-sm my-1 ml-5 md:ml-14 mr-1 lg:ml-14 w-16 border-2 rounded-lg border-black ring-2 ring-slate-200 hover:scale-110' onClick={() => {
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
      <div className='hidden md:flex font-semibold mt-5'>
         {renderCategories()}
      </div>
      
      <div className='flex relative md:hidden'>
         <button onClick={() => setIsOpen((prev) => !prev)} className='w-full flex items-center'>
         CHOOSE CATEGORY
         {!isOpen ? (
            <AiOutlineCaretUp className='h-8' />
         ):(
            <AiOutlineCaretDown className='h-8'/>
         )}
         </button>

         {isOpen && (
            <div className='absolute flex flex-col items-start my-10'>
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