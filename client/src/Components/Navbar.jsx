import React, { useContext, useState } from 'react'
import { PiPaperPlaneBold } from "react-icons/pi";
import { FiSearch } from "react-icons/fi";
import { FaPlaneDeparture } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { UserContext } from '../UserContext';
import Datepicker from './Datepicker';
import axios from 'axios';

const Navbar = ({onSearch}) => {

  const {user} = useContext(UserContext);
  const [query,setquery]  = useState(' ');
  const [tour,settour] = useState('')


  const [CheckinDate,setCheckinDate] = useState('')

  console.log(query)

  const handleChange = (e)=>{
    setquery(e.target.value)
  }

  



    const handleCheckinDate = (ev)=>{
      ev.preventDefaults();
      setCheckinDate(ev.target.value)
    }

  return (

    
    <div className='p-2 bg-zinc-100 relative w-full shadow-md rounded-xl'>

        
        <div className='flex relative md:justify-evenly justify-between 2xl:justify-around items-center'>

    <Link to={'/'}>
        <span className='flex xl:flex-row xl:items-center flex-col'>
        
          <FaPlaneDeparture className='text-3xl lg:text-5xl text-red-500'/>
            <h1 className='text-xl lg:text-3xl hidden sm:block text-red-500 font-bold'>Travel Mate</h1>
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
            <input type="search" name="search" id="" placeholder='Plan your Holiday' onChange={handleChange} className='border lg:rounded-full shadow-md outline-none lg:shadow-none rounded-xl lg:border-none text-center py-2 px-4'/>
            <hr className='hidden lg:block border-l-2 my-auto h-6'/>
            <Datepicker value={CheckinDate} onChange={handleCheckinDate}/>
            <hr className='hidden xl:block border-l-2 my-auto h-6'/>
            <input type="number" name="search" id="" min='0' placeholder='Add Members' className='hidden border xl:rounded-full xl:block xl:border-none outline-none rounded-xl text-center py-2 px-4'/>

            <FiSearch className='hidden lg:block text-3xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out font-bold bg-red-500 rounded-full p-1 text-white'/>
        </span>
        </div>

        <div className='gap-4 flex border-none md:border-2 border-zinc-500 shadow-none md:shadow-md rounded-full p-2'>
        
        <Link to={user ? '/account':'/login'}>
        
        {
          user && (
        <div className='flex items-center gap-2'>
        <FaRegUserCircle className='text-xl text-zinc-600'/>
        <p className='text-lg font-semibold'>{user?user.name:''}</p>
        </div>            
          )
        }
        </Link>
        </div>

        </div>
        {/* <div className='absolute bottom-4 bg-white w-28 p-4 right-24'>
          
          <div>
          <Link to={user ? '/account':'/login'}>
            <h2 className='font-semibold text-lg'>User/Seller</h2>
          </Link>
            <h2 className='font-semibold text-lg'>TourGuide</h2>
          </div>
          <RxCross2 className='absolute text-2xl right-0 top-0'/>

          
          
        </div> */}





    </div>
  )
}

export default Navbar