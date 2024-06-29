import React, { useState } from 'react'
import { PiPaperPlaneBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

  const [name,setname] = useState('') 
  const [email,setemail] = useState('') 
  const [password,setpassword] = useState('') 
  const navigate = useNavigate();

  const registeruser = async(e)=>{
    e.preventDefault();

    try {
      await axios.post('/signup',{
        name,
        email,
        password
      })
      toast.success('Signup Successfull');
      navigate("/login")
    } catch (error) {
      toast.error("User Already Exists / Server Error.")
    }

  }

  return (
   
    <div className='h-screen flex items-center justify-center'>
        <div className='mx-auto mb-40 w-[80vw] sm:w-[60vw] md:w-[40vw] xl:w-[30vw] 2xl:w-[30vw] rounded-md shadow-md'>
            <form action="" className='flex flex-col items-center gap-4' onSubmit={registeruser}>
            <span className='flex items-center flex-col'>
            <PiPaperPlaneBold className='text-3xl xl:text-4xl text-red-500'/>
            <h1 className='text-xl text-red-500 font-bold'>Airbnd</h1>
        </span>
        <h1 className='text-2xl font-semibold'>Register</h1>
                <input type="name" name="name" placeholder='Enter username' value={name} onChange={e=>setname(e.target.value)} className='border focus:border-red-500 focus:animate-pulse transition-all ease-in-out duration-300 outline-none w-60 lg:w-80 rounded-md py-2 px-3'/>
                <input type="email" name="email" placeholder='Joony@email.com' value={email} onChange={e=>setemail(e.target.value)} className='border focus:border-red-500 focus:animate-pulse transition-all ease-in-out duration-300 outline-none w-60 lg:w-80 rounded-md py-2 px-3'/>
                <input type="password" name="password" placeholder='Password' value={password} onChange={e=>setpassword(e.target.value)} className='border focus:border-red-500 focus:animate-pulse transition-all ease-in-out duration-300 outline-none w-60 lg:w-80 rounded-md py-2 px-3'/>
                
                <button type="submit" className='p-2 bg-red-500 outline-red-500 text-xl font-bold text-white rounded-md'>Register</button>

                <span className='mb-2'>Already with us ? <Link to={"/login"} className='text-red-500 hover:underline'>Login</Link></span>
            </form>
        </div>
    </div>
    
  )
}

export default Signup