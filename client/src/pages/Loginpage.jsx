import React, { useContext, useState } from 'react'
import { PiPaperPlaneBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

const Loginpage = () => {

    const [email,setemail] = useState("") 
    const [password,setpassword] = useState("") 
  const navigate  = useNavigate()

  const {user,setuser} = useContext(UserContext)

  const loginuser = async(e)=>{
    e.preventDefault();

    try {
      const {data} = await axios.post('/login',{
        email,
        password
      })
      toast.success('Login Successfull')
      setuser(data)
      navigate("/")
    } catch (error) {
      toast.error("Invalid Credentials")
    }

  }



  return (
    <div className='h-screen flex items-center justify-center'>
        <div className='mx-auto mb-40 w-[80vw] sm:w-[60vw] md:w-[40vw] xl:w-[30vw] 2xl:w-[20vw] rounded-md shadow-md p-4'>
            <form action="" className='flex flex-col items-center gap-4' onSubmit={loginuser}>
            <span className='flex items-center flex-col'>
            <PiPaperPlaneBold className='text-3xl xl:text-4xl text-red-500'/>
            <h1 className='text-xl text-red-500 font-bold'>Airbnd</h1>
        </span>
        <h1 className='text-2xl font-semibold'>Login</h1>
                <input type="email" name="email" placeholder='Joony@email.com' value={email} onChange={(ev)=>setemail(ev.target.value)} className='border w-40 sm:w-60 lg:w-80 outline-none rounded-md py-2 px-3'/>
                <input type="password" name="password" placeholder='Password' value={password} onChange={(ev)=>setpassword(ev.target.value)} className='border w-40 sm:w-60 lg:w-80 outline-none rounded-md py-2 px-3'/>
                <button type="submit" className='p-2 bg-red-500 text-xl font-bold text-white rounded-md'>Login</button>
                
              
                <span className='mb-2 text-[12px] md:text-base'>Doesn't have an account ? <Link to={"/signup"} className='text-red-500 hover:underline'>Register Now</Link></span>

            </form>
        </div>
    </div>
  )
}

export default Loginpage