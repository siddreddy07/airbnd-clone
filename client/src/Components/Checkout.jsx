import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { differenceInCalendarDays } from "date-fns";
import { IoIosArrowBack } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';
import { IoDiamond } from "react-icons/io5";
import Loginpage from '../pages/Loginpage';
import Viewplace from './Viewplace';
import axios from 'axios';


const Checkout = () => {
const {user} = useContext(UserContext)
const [id,setid] = useState(0)

    
useEffect(() => {
    if(user){
        setid(user.id)
    }
    else{
        toast.error("please Login")
        navigate("/login")
    }

}, [user])





const location = useLocation()
const {data1,CheckoutDate, CheckinDate, guests} = location.state || {}
const previouspage = ()=>{
    window.history.back();
}
const discount =7520;

const navigate = useNavigate()

const indays = differenceInCalendarDays(
    new Date(CheckoutDate),
    new Date(CheckinDate)
  )

const editpreference = ()=>{
    window.history.back();
}

const checkouthandler = async()=>{
    const {data:{key}} = await axios.get("/getkey")

    const{data:{order}} = await axios.post("/checkout",{
        amount:indays*data1.price
    })

    
    

    const options = {
        key,
        amount:order.amount,
        currency:"INR",
        name:data1.user,
        description:data1.title,
        image:data1.photo[0],
        order_id:order._id,
        callback_url:"http://localhost:8000/paymentverify",
        prefill:{
            name:user.name,
            email:user.email,
        },
        notes:{
            "address":"razorpaypaymentgateway"
        },
        theme:{
            "color":"$3399"
        }
    };


    
    const razor = new window.Razorpay(options)
    razor.open();
    console.log(razor)
    
bookdata();


}


const bookdata = async()=>{

    try {
        
      const res = await axios.post("/booking/"+id,{
            data1,CheckinDate,CheckoutDate,guests
        })

        console.log(res.data)
          
    } catch (error) {
        console.log(error.message)
    }
}



  return (
    <div>
          <Toaster
  position="top-center"
  reverseOrder={false}
/>
        {
            user && (
                <div className='w-full h-screen'>
                    <div className='xl:w-[90vw] md:w-full flex items-start md:flex-row relative flex-col md:items-center justify-between mx-auto px-8 py-8 h-screen'>
                        <div className='w-[35vw] flex flex-col gap-4 p-2'>
                            <span className='flex mt-4 w-[80vw] items-center'><IoIosArrowBack className='font-semibold text-2xl md:text-3xl lg:text-5xl'onClick={previouspage}/><h2 className='font-semibold text-2xl md:text-3xl lg:text-5xl'>Confirm & Pay</h2></span>
                            <span className='md:flex hidden px-4 py-2 mt-6 items-center justify-between border-2 rounded-xl'>
                                <div className='flex flex-col'>
                                <h2 className='font-semibold text-xl md:text-2xl lg:text-3xl'>This is a rare find.</h2>
                                <p className='font-base'>{data1.title} is usually booked</p>
                                </div>
                                <IoDiamond className='text-3xl text-pink-600'/>
                            </span>
                            <span className='mt-4 md:w-[30vw] w-[80vw]'>
                                <h2 className='font-semibold text-xl md:text-2xl lg:text-3xl'>Your Trip</h2>
                                <span className='flex justify-between sm:w-[40vw] items-center'>
                                    <div className='flex mt-4 flex-col gap-2'>
                                    <h2 className='font-medium text-xl'>Dates</h2>
                                    <p>From {CheckinDate} to {CheckoutDate}</p>
                                    <p>For {indays} Nights</p>
                                    </div>
                                    <p className='underline font-base text-lg cursor-pointer' onClick={editpreference} >Edit</p>
                                </span>
                                <span className='flex justify-between sm:w-[40vw] items-center'>
                                    <div className='flex mt-4 flex-col gap-2'>
                                    <h2 className='font-medium text-xl'>{guests}</h2>
                                    <p>Total Guests</p>
                                    </div>
                                    <p className='underline font-base text-lg cursor-pointer' onClick={editpreference}>Edit Guest List</p>
                                </span>
                            </span>
                            <hr className='h-1 mt-2 mb-2 rounded-lg'/>
                            <div className='flex w-[80vw] md:w-[40vw] lg:w-[50vw] flex-col'>
                                <h2 className='font-semibold text-xl md:text-2xl lg:text-3xl'>Personal Details <span className='font-normal text-xl'>(For Communication purpose)</span></h2>
                                <h2 className='mt-2'>Name : {user.name}</h2>
                                <h2 className='mt-2'>Email : {user.email}</h2>
                                <h2 className='mt-2'>Mobile : +91 4245654872</h2>
                            </div>
                        </div>
                        <div className='lg:w-[38vw] md:w-[45vw] sm:w-[80vw] xl:w-[30vw] w-[85vw] flex flex-col sticky top-0  gap-4 p-2 sm:p-6 border-2 rounded-xl'>
                            <div className='flex justify-start items-center gap-4 md:gap-2 xl:gap-2'>
                            <div className='sm:w-32 w-40 md:w-48 lg:w-[15vw] xl:w-[20vw] xl:h-[15vh] 2xl:w-[15vw] h-24 border-2 rounded-xl overflow-hidden'>
                                <img src={`http://localhost:8000/${data1.photo[0]}`} className='w-full h-full object-fill' alt="" />
                            </div>
                            <div>
                            <p className='font-semibold text-lg'>{data1.title}</p>
                            <p className='line-clamp-1'>{data1.address}</p>
                            <p>Ratings</p>
                            </div>
                            
                            
                            </div>
                            <hr className='md:mt-3 mt-1 mb-1 md:mb-3'/>
                            <div>
                            <p className='font-semibold text-lg md:text-xl'>Price Details</p>
                            <div className='flex mt-2 justify-between items-center'>
                            <p>₹{indays * data1.price}</p>
                            <p>Total Amount</p>
                            </div>
                            <div className='flex mt-2 justify-between items-center'>
                            <p>Weekly Stay Discount</p>
                            <p className='text-green-500 font-semibold'>-₹{discount}</p>
                            </div>
                            </div>
                            <hr className='md:mt-3 mt-1 mb-1 md:mb-3'/>
                            <div className='flex mt-2 justify-between items-center'>
                            <p className='font-semibold text-lg md:text-xl'>Total Price (INR)</p>
                            <p>₹{indays*data1.price - discount}</p>
                            </div>
                            <Link to={{pathname: "/payments/"+user.id}} state={{data1,CheckinDate,CheckoutDate,guests}}>
                            <button className='w-full bg-red-500 text-white font-bold text-xl p-2 border-2 border-red-500 hover:bg-transparent hover:text-black hover:border-red-500 rounded-xl transition-all ease-in-out duration-300' onClick={checkouthandler}>Continue to Pay</button>
                            </Link>
                        </div>
                        
                    </div>
                    
                </div>
            )
        }

        {
            !user && (
                <div>
                    <Loginpage/>
                </div>
            )
        }
    </div>
  )
}

export default Checkout