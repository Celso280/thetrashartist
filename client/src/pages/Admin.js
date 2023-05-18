import axios from "axios";
import { toast } from 'react-toastify';

function Posts(props) {

  const handleRegStatus = async (status) => {
        toast.success(`Changed status successfully!`)
        await axios.put(`/update-art-reg-status/${props.art.art_id}`, {
        registration_status:status
      })      
      
    }

  return (
      <div className="p-2 w-60 shadow-md hover:scale-95 bg-white"> 
        <div>
            <img src={props.art.upload_image} alt='art'/>
        </div>
        <div>
            <div className='p-2 text-sm'>
                <p>Category: {props.art.category}</p>
                <p>Name: {props.art.art_name}</p>
                <p>Price: {props.art.price}</p>
                <p>Location: {props.art.location}</p>
                <p>Description: {props.art.description}</p>
            </div>  
        </div>
        <div className="flex justify-around">
          <button onClick={() => handleRegStatus('approved')} className="bg-sky-500 text-white font-bold text-sm rounded-lg p-1 my-2">ACCEPT</button>
          <button onClick={() => handleRegStatus('rejected')} className="bg-red-500 text-white font-bold text-sm rounded-lg p-1 my-2">REJECT</button>
        </div>
      </div>
  )
  
}

export default Posts