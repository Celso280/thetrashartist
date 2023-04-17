import React, { useState } from 'react'
import NavBar from '../../components/NavBar'

function Plastic() {

    const [plasticArr, setPlasticArr] = useState([
        {
               image: 'bucket.jpg',
            category: 'Plastic',
             artName: 'Bucket',
               price: 10,
            location: 'Philippines'
        },
        {
            image: 'car.jpg',
         category: 'Plastic',
          artName: 'Car',
            price: 20,
         location: 'Philippines'
        },
        {
            image: 'cpcase.webp',
         category: 'Plastic',
          artName: 'CP case',
            price: 30,
         location: 'Philippines'
        },
        {
            image: 'giftbox.jpg',
         category: 'Plastic',
          artName: 'Gift box',
            price: 40,
         location: 'Philippines'
        },
        {
            image: 'lightcover.jpg',
         category: 'Plastic',
          artName: 'Light cover',
            price: 50,
         location: 'Philippines'
        },
        {
            image: 'pot.jpeg',
         category: 'Plastic',
          artName: 'Pot',
            price: 60,
         location: 'Philippines'
        },
        {
            image: 'trashbin.jpg',
         category: 'Plastic',
          artName: 'Trash bin',
            price: 70,
         location: 'Philippines'
        },
    ]) 

  return (
    <div>
        <NavBar/>
        <div className='flex bg-white mt-5'>
            {plasticArr.map((art, index) => ( 
               <div className='m-auto max-w-xs border-2 border-black bg-slate-200'>
                  <div className='w-44 h-44'>
                     <img className='object-cover' src={art.image} alt='' />
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

export default Plastic