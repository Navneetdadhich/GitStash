import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { RiLoginCircleFill } from "react-icons/ri";
import { IoLogInOutline } from "react-icons/io5";
import { TiStarFullOutline } from "react-icons/ti";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className='absolute w-full bg-transparent flex z-100 sm:pr-10 pt-5 sm:justify-end justify-center text-black gap-5'>
        
        <div className='flex items-center justify-center hover:text-blue-700 cursor-pointer'>
<IoLogInOutline className='text-lg '/>

        <button className='flex gap-2 items-center justify-center h-9 w-15 p-1 text-md font-normal bg-transparent  cursor-pointer'
            onClick={() => navigate('/login')}
            >
            Login
        </button>
              </div>

        <button className='flex justify-center items-center gap-2 h-9 w-26 p-1 text-md font-normal bg-black rounded-full hover:bg-gray-800 text-white cursor-pointer'
        onClick={() => navigate('/signup')}>

<TiStarFullOutline />
            Signup
        </button>
    </div>
  )
}

export default NavBar