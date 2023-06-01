import { AuthContext } from "../context/AuthContext";
import React, {useState, useEffect, useContext} from 'react'
import NavBar from '../components/NavBar'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom'

function EditUser() {

    const [editUser, setEditUser] = useState({})
    const context = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const { account } = location.state

    useEffect(() => {
        setEditUser(account)
      }, [])

    const handlefirst_name = (e) => {
        let value = e.target.value;
        value = value.replace(/[^A-Za-z\s]/gi, "");
        setEditUser({
          ...editUser, first_name: value
        })
      };

    const handlelast_name = (e) => {
    let value = e.target.value;
    value = value.replace(/[^A-Za-z\s]/gi, "");
    setEditUser({
        ...editUser, last_name: value
    })
    };

    const handleEmail = (e) => {
        let value = e.target.value
        setEditUser({
          ...editUser, email: value
        })
      };
      
    const handlePassword = (e) => {
    let value = e.target.value
    setEditUser({
        ...editUser, password: value
    })
    };

    const handleLocation = (e) => {
        let value = e.target.value
        setEditUser({
            ...editUser, location: value
        })
        };

    const handleContact = (e) => {
        let value = e.target.value
        setEditUser({
            ...editUser, contact: value
        })
        };

    const handleBio = (e) => {
        let value = e.target.value
        setEditUser({
            ...editUser, bio: value
        })
        };

    const handleRole = (e) => {
        let value = e.target.value
        setEditUser({
            ...editUser, role: value
        })
        };

    const handleProfilePicture = (e) => {
        const file = e.target.files[0];
        
        //FormData is used when sending files to the backend so the endpoint can read it
        const formData = new FormData();
        formData.append('file', file);
        //line 80-84 is uploading to cloudinary
        axios.post('http://localhost:8000/upload-picture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            })
            .then(res => {
            console.log(`this is upload-picture ${res.data}`);
            setEditUser({
                ...editUser, profilePicture: res.data.url
            })
            })
            .catch(error => {
            console.error(error);
            });
        };

    const updateUser = (e) => {
        e.preventDefault();
    
        axios.put(`http://localhost:8000/update-user/${context.user.user_id}`, {
            first_name: editUser.first_name,
            last_name: editUser.last_name,
            profile_picture: editUser.profilePicture,
            bio: editUser.bio,
            email: editUser.email,
            password: editUser.password,
            location: editUser.location,
            contact: editUser.contact,
            role: editUser.role,
            })
            .then(function (response) {
            console.log('this is the response from edituse', response);
            navigate('/account')
            toast.success('You have successfully edited your information')
            })
            .catch(function (error) {
            console.log(error);
            });
        };

console.log('this is the editUser', editUser);
  return (
    <div>
        <NavBar/>
        <div className='rounded m-auto mt-20 w-1/3 border-2 border-black p-2'>
            <div className='rounded bg-sky-500 text-white mb-2 px-2 py-1'>
                <p>You are currently editing your information</p>
            </div>
            <div>
                <form className='flex flex-col' onSubmit={updateUser}>

                    <div className='mb-2'>
                        <input 
                        type="text" 
                        placeholder='First name'
                        onChange={handlefirst_name}
                        value={editUser.first_name}/>
                    </div>

                    <div className='mb-2'>
                        <input 
                        type="text" 
                        placeholder='Last name'
                        onChange={handlelast_name}
                        value={editUser.last_name}/>
                    </div>

                    <div className='mb-2'>
                        <input 
                        type="email" 
                        placeholder='Email'
                        onChange={handleEmail}
                        value={editUser.email}/>
                    </div>

                    <div className='mb-2'>
                        <input 
                        type="password" 
                        placeholder='Password'
                        onChange={handlePassword}
                        value={editUser.password}/>
                    </div>

                    <div className='mb-2'>
                        <input 
                        type="text" 
                        placeholder='Location'
                        onChange={handleLocation}
                        value={editUser.location}/>
                    </div>

                    <div className='mb-2'>
                        <input 
                        type="number" 
                        placeholder='Contact'
                        onChange={handleContact}
                        value={editUser.contact}/>
                    </div>

                    <div className='mb-2'>
                        <input 
                        type="text" 
                        placeholder='Bio'
                        onChange={handleBio}
                        value={editUser.bio}/>
                    </div>

                    <div className='mb-2'>
                        <p>Please select a role :</p>
                            <input
                                type="radio"
                                name="role"
                                id="buyer"
                                value="buyer"
                                onChange={handleRole}
                            />
                              <label for="buyer">Buyer</label>
                            <br />
                            <input
                                type="radio"
                                name="role"
                                id="artist"
                                value="artist"
                                onChange={handleRole}
                            />
                              <label for="artist">Artist</label>
                            <br />
                    </div>

                    <div>
                        <label
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            for="multiple_files"
                        >
                            Edit profile picture
                        </label>
                        <input
                            class="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="multiple_files"
                            type="file"
                            multiple
                            onChange={handleProfilePicture}
                        />
                    </div>

                    <div className='self-center rounded text-center w-1/2 mt-5 text-white bg-sky-500'>
                        <button>Submit</button>
                    </div>

                </form>
            </div>
        </div>
        
    </div>
  )
}

export default EditUser