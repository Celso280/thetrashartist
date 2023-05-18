import React, { useState, useEffect } from 'react'
import { AiOutlineCaretUp, AiOutlineCaretDown} from 'react-icons/ai'
import axios from 'axios'
import arts from './Arts'
import Modal from '../Modal'


function Home() {

   const [isOpen, setIsOpen] = useState(false)
   const [current, setCurrent] = useState('All')
   const [homeArray, setHomeArray] = useState([])
   const [arts, setArts] = useState([])
   const [showModal, setShowModal] = useState(false)
   const [selectedArt, setSelectedArt] = useState({})

   useEffect(() => {
      getArts()
   }, [])
   
   const getArts = async() => {
      // you can insert a config variable after the '/all-users' to make it only accessible to those who have JWT token
      const response = await axios.get('/all-arts/approved')
      setArts(response.data)
      setHomeArray(response.data)
   }
    
   const renderCategories = (additionalClassName) => {
      const categoriesArr = [
         'All',
         'Electronic',
         'Fabric',
         'Glass',
         'Paper',
         'Plastic',
         'Wood',
         'Styrofoam',
         'Others'
      ]
   
   const categolist = categoriesArr.map((category, index) => (
      <div className='text-sm mx-5 my-1 px-1 md:mx-1 shadow-md rounded-lg hover:scale-110'>
         <button className='my-2 uppercase' onClick={() => {
         filterItems(category)
         setCurrent(category)
         }}>{category}</button>
      </div>
   ))

   return (
      <div className={`${additionalClassName} flex`}>
         {categolist}
      </div>
   )
}

const filterItems = (category, searchQuery) => {
   const filteredArts = arts.filter((art) => {
      
      // ang codeblock na ito ay pineferporm lng kpag nag ssearch si user line 45-56
      if (searchQuery) { 
      //searchQuery ito yung tinatype ni user sa search bar
         if (category === 'All'){
            return(
              art.art_name.toLowerCase().includes(searchQuery.toLowerCase())
            )
         }

         return(
           art.category === category && art.art_name.toLowerCase().includes(searchQuery.toLowerCase())
         )
      } 

      //ito nmn ang code kpag hnd nagssearch si user line 59-68
      if (category === 'All'){
         return art
      }
      return(
         art.category === category   
      )  
   })
   setHomeArray(filteredArts)
 }

  return (
    <div>
      <div className='hidden lg:flex font-semibold mt-5'>
         {renderCategories('ml-[52px]')}    
      </div>

      <div className='w-60 ml-14'>
         <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-md overflow-hidden shadow-lg">
            <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" stroke="currentColor">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
            </div>

            <input onChange= { (e) => filterItems(current, e.target.value)}
            className="peer h-full w-full outline-none text-md text-black pr-2 bg-transparent"
            type="text"
            id="search"
            placeholder="Search your art here"
             /> 
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
            <div className='absolute my-10 bg-white'>
               {/* sa line 104 nag papasaa tayo ng classname sa line 35 */}
               {renderCategories('flex flex-col text-center')} 
            </div>
               )}
      </div>
      
      <div className='flex font-semibold flex-wrap justify-evenly max-h-screen overflow-auto px-10 mt-5'>
            {homeArray.map((art, index) => ( 
               <div className='mb-3 hover:scale-95 shadow-md bg-white'>
                  <div>
                     <img className='w-80 h-60 p-2' src={art.upload_image} alt='' />
                  </div>
                  <div className='p-2 text-sm ml-4'>
                     <p>Category: {art.category} </p>
                     <p>Art name: {art.art_name} </p>
                     <p>Price: {art.price} </p>
                     <p>Location: {art.location} </p>  
                  </div>
                  <div className='flex m-2 justify-end'> 
                     <button 
                     className='bg-sky-500 rounded-md px-1 items-end'
                     onClick={() => {
                        setShowModal(true)
                        setSelectedArt(art)
                     }}
                     >Inquire</button> 
                  </div>
               </div>
            ))}
      </div>
      <Modal selectedArt = {selectedArt} isVisible = {showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}

export default Home