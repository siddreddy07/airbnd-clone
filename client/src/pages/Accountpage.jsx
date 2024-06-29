import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Accountpage = () => {
  let {subpage}  = useParams()
  
  const navigate = useNavigate();

  if(subpage === undefined){
    subpage = 'profile'
  }
  console.log(subpage)

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
    let classes = 'sm:px-3 p-2 sm:py-2';
    if(type === subpage || (subpage === undefined && type === 'profile') ){
    classes += ' text-white bg-red-500 font-semibold rounded-2xl sm:rounded-full';
    }
    return classes;
  }

  return (

    <div>
      <nav className='mt-4 w-full flex gap-4 sm:gap-8 mb-8 sm:flex-row flex-col transition-all duration-500 ease-linear justify-center'>
        <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
        <Link className={linkClasses('places')} to={'/account/places'}>My Acommodations</Link>
      </nav>

      {user && (
        <div className='sm:max-w-80 w-64 mx-auto'>
          <h2 className='font-semibold text-[14px] text-center sm:text-lg'>Logged in as {user.name}</h2>
          <button onClick={logout} className='bg-red-500 mt-2 w-full text-white font-semibold p-1 sm:px-3 sm:py-2 rounded-full'>Logout</button>
        </div>
      )}

    </div>
  )
}

export default Accountpage