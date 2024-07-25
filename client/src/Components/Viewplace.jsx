import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from "date-fns";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { RiShare2Line } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';
import { RxAvatar } from "react-icons/rx";
import { IoChevronBackOutline, IoWifiOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import axios from 'axios';
import { UserContext } from '../UserContext';
import { PiTelevisionSimpleFill } from 'react-icons/pi';
import { MdOutlinePets } from 'react-icons/md';
import { TbToolsKitchen3 } from 'react-icons/tb';
import { LiaDoorOpenSolid } from 'react-icons/lia';
import { BiSolidParking } from 'react-icons/bi';
import Datepicker from './Datepicker';


const Viewplace = () => {

    let {id} = useParams();
    const [places,setplaces] = useState([])
    const [fetchstatus,setfetchstatus] = useState('idle','success')
    const {user} = useContext(UserContext)
    const [CheckinDate,setCheckinDate] = useState('');
    const [newpage,setnewpage] = useState(false)
    const [CheckoutDate,setCheckoutDate] = useState('');
    const [availability,setavailability] = useState('Not Available');
    const [checkbutton,setcheckbutton] = useState(false);
    const [guests,setguests] = useState(1);
    const [data1,setdata1] = useState([]);
    const [diffindays,setdiffindays] = useState(0)
    const indays = differenceInCalendarDays(
        new Date(CheckoutDate),
        new Date(CheckinDate)
      )

      useEffect(() => {
        setdiffindays(indays)
      }, [indays])
      

    function handleCheckinDate(ev){
        ev.preventDefault()
            setCheckinDate(ev.target.value)
            setavailability('')
            setfetchstatus('idle')
            setcheckbutton(false);
            
    }
    function handleCheckoutDate(ev){
        ev.preventDefault()
            setCheckoutDate(ev.target.value);
            setavailability('');
            setfetchstatus('idle')
            setcheckbutton(false);
            
    }

    


    function handleguests(ev){
        ev.preventDefault()
        setguests(ev.target.value)
    }

    const checkavailability = async()=>{

       const res = await axios.post("/check/"+id,{
        user,CheckinDate,
            CheckoutDate,guests 
        })
        
        setfetchstatus('idle')
        try {

            if(guests > places.maxguests){
                toast.error("Exceed in no. of Guests")
                setcheckbutton(false)
            }

            else if(res.status===200 && CheckinDate && CheckoutDate){
                setavailability('Available');
                setcheckbutton(true);
                setfetchstatus('success')
                setnewpage(true)
            }
            else{
                setavailability('Not Available');
                setfetchstatus('idle')
            }
        } catch (error) {
            toast.error(error.message)
            setfetchstatus('idle')
        }

    }


    const navigatetonewpage = ()=>{
        if(fetchstatus==='success'){
            setnewpage(true)
            setcheckbutton(true)
            
        }
        else{
            setnewpage(false)
            console.log('no user')
        }
    }

    const handleclick = async()=>{
        if(fetchstatus==='idle'){
            await checkavailability();
        }
        else if(fetchstatus==='success'){
            navigatetonewpage();
        }
    }


    useEffect(() => {
        axios.get("/place/"+id).then(res=>{
            setplaces(res.data);
            setdata1(res.data);
        })
        
    }, [])




  return (
    <div className='w-full h-screen'>
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <div className='w-full h-screen xl:px-28 md:p-12 p-4 xl:py-16'>
    
            <div className='flex md:mx-auto md:w-[80vw] lg:w-[78vw] xl:w-[80vw] justify-between'>
                <h2 className='font-semibold hidden md:block md:text-3xl'>{places.title}</h2>
                <Link to={"/"}>
                <span className='flex items-center md:hidden gap-2'><IoChevronBackOutline className='font-medium'/><span className='text-center text-lg font-medium'>Home</span></span></Link>
                <div className='flex items-center sm:gap-6 gap-4 md:gap-8 xl:gap-14'>
                <span className='flex items-center md:text-xl  gap-1 cursor-pointer text-base sm:text-lg '><RiShare2Line className='md:text-xl'/><span className='hidden sm:block'>Share</span></span>
                <span className='flex items-center md:text-xl gap-1 cursor-pointer'><GoHeart className='md:text-xl'/><span className='hidden sm:block'>Like</span></span>
                </div>
            </div>

            {
                places && (
                    <div>
                    <div className='w-full mt-2 h-72 md:hidden rounded-xl carousel'>
                    {places.photo?.map((item,index)=>{
                       return <div key={index} className='w-full relative h-full carousel-item flex overflow-hidden'>
                        <img src={`http://localhost:8000/${places.photo[index]}`} className='object-fit h-full w-full hover:scale-125 transition-all cursor-pointer ease-in-out duration-700' alt="" />
                        <div className='md:hidden absolute z-50 bottom-0 px-3 py-1 text-center rounded-full right-1 bg-black bg-opacity-50'><span className='text-zinc-400 transition-all animate-bounce duration-500 ease-in-out font-semibold'>{index+1}/{places.photo.length}</span></div>
                      </div>
                    })}
                    </div>
                    <h2 className='md:hidden text-[24px] text-start font-semibold'>{places.title}</h2>
                    
                    {
                        places.photo && (
                            <div className='w-[85vw] md:w-[80vw] md:h-[28vh] lg:h-[38vh] xl:w-[80vw] relative md:mx-auto mt-4 xl:h-[42vh] 2xl:h-[48vh] gap-2 hidden md:flex items-center justify-between rounded-xl overflow-hidden'>
                                <div className='lg:w-[60vw] md:w-[74vw] h-full bg-white overflow-hidden'>
                                <img src={`http://localhost:8000/${places.photo[0]}`} className='object-fit h-full w-full hover:scale-125 transition-all cursor-pointer ease-in-out duration-700' alt="" />
                                </div>

                                <button className="absolute md:block hidden bg-white z-50 md:bottom-1 xl:bottom-2 xl:right-2 md:right-1 text-red-500 font-medium rounded-lg px-2" onClick={()=>document.getElementById('my_modal_2').showModal()}>Show more</button>
                                <dialog id="my_modal_2" className="modal z-100">
                                <div className="modal-box px-2 rounded-lg bg-zinc-800 bg-opacity-15 grid grid-cols-2 no-scrollbar items-center overflow-visible overflow-x-scroll scroll-smooth z-50">
                                    {
                                        places.photo.map((item,index)=>{
                                            return <div key={index} className='w-[35vw] mr-2 h-[25vw]'>
                                            <img src={`http://localhost:8000/${places.photo[index]}`} className='object-fit h-full w-full hover:scale-150 transition-all cursor-pointer ease-in-out duration-700' alt="" />
                                            </div>
                                        })
                                    }
                                
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                                </dialog>


                                <div className='grid grid-cols-2 gap-2 rounded-r-xl overflow-hidden'>
                                    <div className='w-58 h-48 overflow-hidden'><img src={`http://localhost:8000/${places.photo[0]}`} className='object-fit h-full w-full hover:scale-125 transition-all cursor-pointer ease-in-out duration-700' alt="" /></div>
                                  <div className='w-58 h-48 overflow-hidden'><img src={`http://localhost:8000/${places.photo[1]}`} className='object-fit h-full w-full hover:scale-125 transition-all cursor-pointer ease-in-out duration-700' alt="" /></div>
                                  <div className='w-58 h-48 overflow-hidden'><img src={`http://localhost:8000/${places.photo[2]}`} className='object-fit h-full w-full hover:scale-125 transition-all cursor-pointer ease-in-out duration-700' alt="" /></div>
                                  <div className='w-58 h-48 overflow-hidden'><img src={`http://localhost:8000/${places.photo[3]}`} className='object-fit h-full w-full hover:scale-125 transition-all cursor-pointer ease-in-out duration-700' alt="" /></div>
                                </div>
                            </div>
                        )
                    }

                    
                    </div>

                )
                  
            }
            
    
             <div className='items-start md:px-8 relative lg:px-14 xl:px-2 2xl:px-10 md:py-10 md:-mt-6 md:block flex flex-col'>
                <h2 className='font-semibold md:text-2xl text-start text-[20px]'>{places.address}</h2>
                <div className='md:block flex md:p-0 flex-col items-start'>
                <h2 className='font-normal text-gray-500 md:text-xl text-[14px]'>Check In/Out Timings : {places.checkin} AM - {places.checkout} PM</h2>
                <h2 className='font-normal text-gray-500 md:text-xl text-[14px]'>Maxguests : {places.maxguests} members</h2>
                
                </div>
                <hr className='mt-2 mb-2 rounded-full bg-zinc-200 w-[40vw]'/>

                
                <div className='w-96 flex gap-2 items-center hover:bg-zinc-200 cursor-pointer hover:bg-opacity-10'>
                <RxAvatar className='text-5xl lg:text-7xl'/>
                
                    <div className='flex flex-col items-start'>
                        {
                            places.user && (
                              <div>
                                <h2 className='text-xl font-semibold'>{places.user.name}</h2>
                                <h2 className='text-lg font-normal text-gray-400'>{places.user.email}</h2>
                                </div>
                            )
                        }
                    </div>
                </div>

                <span className='sticky top-0 bg-white p-2'>
                <div className='relative'>
                    <div className='bottom-0 bg-white md:w-[48vw] w-[90vw] sm:w-[50vw] lg:w-[35vw] flex flex-col gap-4 xl:w-[28vw] 2xl:w-[23vw] border-2 p-2 rounded-xl'>
                        {
                            diffindays>0 ? <h2 className='font-semibold mt-2 mb-2 text-lg'>₹{indays*places.price} <span>for {indays} nights</span></h2>:
                        <h2 className='font-semibold mt-2 mb-2 text-lg'>Add Dates for Price</h2>
                        }
                <div className='flex gap-2 sm:justify-normal justify-between'>
                <div>
                    <h2>CheckinDate</h2>
                <Datepicker value={CheckinDate} onChange={handleCheckinDate}/>
                    </div>
                    <div>
                <h2>CheckoutDate</h2>
                <Datepicker value={CheckoutDate} onChange={handleCheckoutDate}/>
                
                    </div>
                    
                </div>
                <label className='w-full rounded-xl'>
                    <input type="number" placeholder='Max.guests:7' value={guests} min={1} required={true} max={places.maxguests} onChange={handleguests} className='w-full mt-2 p-2 border-2 rounded-xl'/>
                </label>
                <div className='flex w-full items-center justify-between'>

                    <div><p className='text-gray-600'>Max guests : <span className='font-medium'>{places.maxguests}</span></p>
                {CheckinDate && CheckoutDate ? (
                    <div>
                    <p className='text-sm font-medium'>For {indays} nights</p>
                    <p>From {CheckinDate} to {CheckoutDate}</p>
                    </div>
                ):(<div className='text-gray-500'>choose dates form calander</div>)}
                    </div>
                    <div className='flex flex-col'>
                    <div className='text-medium font-semibold'>₹{places.price}/night</div>
                    <p>{availability}</p>
                    </div>
                </div>
            
            {
                newpage && checkbutton? (<Link to={{pathname:'/account/checkout/'+id}} state={{data1,CheckinDate,CheckoutDate,guests}}>
                    <button className='w-full mt-2 p-2 text-center bg-red-500 font-semibold text-lg text-white rounded-lg' onClick={handleclick}>{checkbutton?"Book Your Vacation" : "Check Availability"}</button>
                </Link>) : (<button className='w-full mt-2 p-2 text-center bg-red-500 font-semibold text-lg text-white rounded-lg' onClick={handleclick}>{checkbutton?"Book Your Vacation" : "Check Availability"}</button>)
            }
                    
                    
                
                
                </div>
                </div>
            </span>

                
                <hr className='mt-2 mb-2 rounded-full bg-zinc-200 w-[40vw]'/>  
                {
                places.perks &&(
                    <div>
                    <h2 className='font-semibold text-xl mb-2'>Perks :</h2>
                    
                <div className='w-[80vw] md:w-[50vw] grid grid-cols-2 sm:grid-cols-3 gap-2'>
                    
                    {places.perks && places.perks.map((item,index)=>{
             
                    if(item === 'tv'){
                        return <h2 key={index}  className='flex text-xl items-center gap-2 font-semibold'><PiTelevisionSimpleFill className='font-semibold text-xl lg:text-2xl'/>TV</h2>
                    }
                    if(item === 'parking'){
                        return <h2 key={index} className='flex text-xl items-center gap-2 font-semibold'><BiSolidParking className='font-semibold text-xl lg:text-2xl'/>Parking</h2>
                    }
                    if(item === 'kitchen'){
                        return <h2 key={index} className='flex text-xl items-center gap-2 font-semibold'><TbToolsKitchen3 className='font-semibold text-xl lg:text-2xl'/>Kitchen</h2>
                    }
                    if(item === 'pets'){
                        return <h2 key={index} className='flex text-xl items-center gap-2 font-semibold'><MdOutlinePets className='font-semibold text-xl lg:text-2xl'/>Pets</h2>
                    }
                    if(item === 'wifi'){
                        return <h2 key={index} className='flex text-xl items-center gap-2 font-semibold'><IoWifiOutline className='font-semibold text-xl lg:text-2xl'/>Wifi</h2>
                    }
                    if(item === 'entrance'){
                        return <h2 key={index} className='flex text-xl items-center gap-2 font-semibold'><LiaDoorOpenSolid className='font-semibold text-xl lg:text-2xl'/>Entrance</h2>
                    }
        
                    })}
                </div>
                    


                    
                </div>
                )                
                }
                
                
          

            
                
            

             </div>
    </div>
    </div>
  )
}

export default Viewplace