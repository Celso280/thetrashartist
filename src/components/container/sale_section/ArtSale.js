import React from 'react'

function ArtSale() {
  return (
    <div className='m-auto bg-slate-200'> 
        <div className='p-2 pl-4'>
            <img src='sampleart.jpg' alt='art sale' />
        </div>
        <div>
            <div className='p-2 text-sm ml-4'>
                <p>Category: Paper</p>
                <p>Art name: Maskara De Papel</p>
                <p>Price: $20.00</p>
                <p>Location: Philippines</p>
            </div>  
        </div>  
    </div>
  )
}

export default ArtSale