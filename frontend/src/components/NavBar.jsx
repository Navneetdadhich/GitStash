import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className='absolute w-full bg-transparent flex z-100 sm:pr-10 pt-5 sm:justify-end justify-center text-black gap-5'>
        
        <button className='h-9 w-15 p-1 text-md font-normal bg-transparent hover:text-blue-700 rounded-full cursor-pointer'
            onClick={() => navigate('/login')}
            >
            Login
        </button>

        <button className='h-9 w-25 p-1 text-md font-normal bg-black rounded-full hover:bg-gray-800 text-white cursor-pointer'
        onClick={() => navigate('/signup')}>
            Signup
        </button>
    </div>
  )
}

export default NavBar