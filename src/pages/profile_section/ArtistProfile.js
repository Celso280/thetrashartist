import React from "react";


function ArtistProfile(user) {
  return (
    <div className='m-1 w-80 hover:scale-95'>
      <div>
          <img src='sampleartist.jpg' alt='art sale'/>
      </div>
      <div>
          <div className='p-2 text-sm'>
              <p>Name: {`${user.user.first_name} ${user.user.last_name}`}</p>
              <p>Art Sold: 100</p>
              <p>Location: Philippines</p>
              <p>Background: Dati adik ako eh ngaun isa na akong ganap na artist</p>
          </div>  
      </div>
    </div>
  );
}

export default ArtistProfile;
