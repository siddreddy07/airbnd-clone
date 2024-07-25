import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Bookings from '../Components/Bookings';
import { RiListIndefinite } from "react-icons/ri";
import Placepage from '../Components/Placepage';
import { MdOutlineAddHomeWork } from "react-icons/md";
import { FiUser } from "react-icons/fi";


const Accountpage = () => {
  let {subpage}  = useParams()
  
  
  const navigate = useNavigate();

  if(subpage === undefined){
    subpage = 'profile'
  }


  const {user,ready,setuser} = useContext(UserContext);
  
 const logout = async()=> {
    await axios.post('/logout');
    setuser(null);
    navigate("/")
  }

  

  if(ready && !user){
    return <Navigate to={"/login"}/>
  }


  function linkClasses (type=null){
    let classes = 'sm:px-3 p-2 sm:py-2 md:w-58 flex items-center justify-center gap-2 sm:gap-3';
    if(type === subpage || (subpage === undefined && type === 'profile') ){
    classes += ' text-white bg-red-500 font-semibold rounded-2xl md:rounded-full';
    }
    else{
      classes+=' bg-zinc-100 rounded-2xl md:rounded-full'
    }
    return classes;
  }

  return (


    <div>
      <nav className='mt-4 w-full items-center flex flex-row gap-3 mb-8 transition-all duration-500 ease-linear justify-evenly md:justify-center'>
        <Link className={linkClasses('profile')} to={'/account'}><FiUser className='font-semibold'/><span className='text-[12px] md:text-lg sm:flex sm:gap-2'><span className='hidden sm:block'>My</span> Profile</span></Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}><RiListIndefinite className='font-semibold'/><span className='text-[12px] md:text-lg sm:flex sm:gap-2'><span className='hidden sm:block'>My</span>Bookings</span></Link>
        <Link className={linkClasses('places')} to={'/account/places'}><MdOutlineAddHomeWork className='font-semibold'/><span className='text-[12px] md:text-lg sm:flex sm:gap-2'><span>My</span>Acommodations</span></Link>
      </nav>




      {user && subpage==='profile' && (
        <div className='sm:w-80vw flex flex-col items-center justify-center'>
          <h2 className='font-semibold text-[14px] text-center sm:text-lg'>Logged in as {user.name} ({user.email})</h2>
          <button onClick={logout} className='bg-red-500 mt-2 text-white font-semibold px-3 py-2 rounded-full'>Logout</button>
        </div>
      )}
      {user && subpage==='bookings' && (
        <div className='sm:max-w-80 w-64'>
          <Bookings/>
        </div>
      )}
      {user && subpage==='places' && (
        <div>
          <Placepage/>
        </div>
      )}

      {/* {subpage==='place' && (
        <div>
          <Viewplace/>
        </div>
      )} */}




    </div>
  )
}

export default Accountpage