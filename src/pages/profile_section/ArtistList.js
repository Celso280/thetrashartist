import React from 'react'
import NavBar from '../../components/NavBar'
import ArtistProfile from './ArtistProfile'


function ArtistList() {
  return (
    <div>
      <NavBar />
      <div className='flex justify-evenly flex-wrap p-2 mt-10'>
        <ArtistProfile />
        <ArtistProfile />
        <ArtistProfile />
        <ArtistProfile />
        <ArtistProfile />
        <ArtistProfile />
        <ArtistProfile />
        <ArtistProfile />
        <ArtistProfile />
        <ArtistProfile />
        <ArtistProfile />
        <ArtistProfile />
      </div>
    </div>
  )
}

export default ArtistList