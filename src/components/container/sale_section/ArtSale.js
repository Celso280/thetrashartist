import React from 'react'

function ArtSale() {
  return (
    <div className='m-1'>
        <div className='bg-slate-200'>
            <div>
                <img className='w-56' src='sampleart.jpg' alt='art sale'/>
            </div>
            <div>
                <div className='p-2 text-sm'>
                    <p>Category: Paper</p>
                    <p>Art name: Maskara De Papel</p>
                    <p>Price: $20.00</p>
                    <p>Location: Philippines</p>
                </div>  
            </div>
        </div>
    </div>
  )
}

export default ArtSale