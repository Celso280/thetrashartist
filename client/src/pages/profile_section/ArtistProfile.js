import React from "react";


function ArtistProfile(props) {
  return (
    <div className='m-1 w-80 hover:scale-95'>
      <div>
          <img src='sampleartist.jpg' alt='art sale'/>
      </div>
      <div>
          <div className='p-2 text-sm'>
              <p>Name: {`${props.xxxx.first_name} ${props.xxxx.last_name}`}</p>
              <p>Art Sold: 100</p>
              <p>Location: {`${props.xxxx.location}`}</p>
              <p>Background: {`${props.xxxx.bio}`}</p>
          </div>  
      </div>
    </div>
  );
}

export default ArtistProfile;
