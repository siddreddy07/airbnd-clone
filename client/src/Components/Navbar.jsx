import React, { useContext, useState } from 'react'
import { PiPaperPlaneBold } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Navbar = () => {

  const {user} = useContext(UserContext);



  return (
    <div className='p-2 bg-zinc-100 shadow-md rounded-xl'>
        
        <div className='flex lg:justify-evenly justify-between 2xl:justify-around items-center'>

    <Link to={'/'}>
        <span className='flex xl:flex-row xl:items-center flex-col'>
            <PiPaperPlaneBold className='text-3xl lg:text-5xl text-red-500'/>
            <h1 className='text-xl lg:text-3xl hidden sm:block text-red-500 font-bold'>Airbnd</h1>
        </span>
    </Link>


        <div>
        <h2 className='text-xl text-center font-semibold mt-2 mb-2'>Hey,
          {
          (user) ? (<span>{`${user.name}👋`}</span>) :(
        <span>Guest</span>)
        }
        </h2>

        <span className='flex mb-4 items-center justify-center lg:justify-between xl:items-center xl:justify-between xl:mx-auto lg:rounded-full 2xl:w-[42vw] md:w-[30vw] xl:w-[50vw] lg:w-[40vw] lg:shadow-md lg:border lg:bg-white'>
            <input type="search" name="search" id="" placeholder='Plan your Holiday' className='border lg:rounded-full shadow-md outline-none lg:shadow-none rounded-xl lg:border-none text-center py-2 px-4'/>
            <hr className='hidden lg:block border-l-2 my-auto h-6'/>
            <input type="date" name="search" id="" placeholder='Dates' className='border lg:rounded-full hidden lg:shadow-none lg:block shadow-md text-zinc-400 lg:border-none rounded-xl text-center outline-none py-2 px-4'/>
            <hr className='hidden xl:block border-l-2 my-auto h-6'/>
            <input type="number" name="search" id="" min='0' placeholder='Add Members' className='hidden border xl:rounded-full xl:block xl:border-none outline-none rounded-xl text-center py-2 px-4'/>

            <FiSearch className='hidden lg:block text-3xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out font-bold bg-red-500 rounded-full p-1 text-white'/>
        </span>
        </div>

        <div className='gap-4 flex border-none md:border-2 border-zinc-500 shadow-none md:shadow-md rounded-full p-2'>
        <GiHamburgerMenu className='text-xl block text-zinc-600'/>
        <Link to={user ? '/account':'/login'}>
        <FaRegUserCircle className='text-xl hidden md:block text-zinc-600'/>
        </Link>
        </div>

        </div>



    </div>
  )
}

export default Navbar