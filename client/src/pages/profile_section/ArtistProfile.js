import React from "react";
import { BsCartCheck } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { FcAbout } from "react-icons/fc";


function ArtistProfile(props) {
  return (
    <div className='mb-2 p-2 hover:scale-95 shadow-md bg-white '>
      <div className=" bg-slate-600">
          <img className="w-80 h-60" src={props.xxxx.profile_picture || 'sampleartist.jpg'} alt='art sale'/>
      </div>
      <div>
          <div className='p-2 text-sm'>
              <p>{`${props.xxxx.first_name} ${props.xxxx.last_name}`}</p>
              <p className="flex items-center"><BsCartCheck className="mr-1" style={{ color: 'blue' }}/> 100</p>
              <p className="flex items-center"><SlLocationPin className='mr-1' style={{ color: 'black' }}/>{`${props.xxxx.location}`}</p>
              <p className="flex items-center"><FcAbout className="mr-1"/> {`${props.xxxx.bio}`}</p>
          </div>  
      </div>
    </div>
  );
}

export default ArtistProfile;