import React from "react";


function ArtistProfile(props) {
  return (
    <div className='w-80 mb-2 p-2 hover:scale-95 shadow-md bg-white '>
      <div className="bg-slate-600">
          <img src={props.xxxx.profile_picture || 'sampleartist.jpg'} alt='art sale'/>
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