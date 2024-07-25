import React, { useContext, useEffect, useState } from 'react'
import { LuPlus } from "react-icons/lu";
import { Link, useParams } from 'react-router-dom';
import { MdOutlineFileUpload } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { TbPhoto } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Perks from './Perks';
import toast, { Toaster } from 'react-hot-toast';
import Places from './Places';
import { UserContext } from '../UserContext';




const Placepage = () => {

  const {action} = useParams();
  const {user} = useContext(UserContext);
  const {id} = useParams();
  const {item} = useParams();
  const navigate = useNavigate();
  const [title,settitle] = useState("");
  const [address,setaddress] = useState("");
  const [photo,setphoto] = useState([]);
  const [description,setdescription] = useState("");
  const [perks,setperks] = useState([]);
  const [extra,setextra] = useState("");
  const [checkin,setcheckin] = useState("");
  const [checkout,setcheckout] = useState("");
  const [price,setprice] = useState();
  const [maxguests,setmaxguests] = useState(Number);
  
console.log({id})

  async function savesubmit(ev){

    ev.preventDefault();

      if(id){
        const {data} = await axios.put("/place",{
          id,
          title,
            address,photo,
            description,perks,extra,
            checkin,checkout,maxguests,price
        })

        try {
          if(data){
            toast.success('Place Updated Successfully!')
            navigate('/account/places')
          }
          console.log("updated Successfullt")
        } catch (error) {
          toast.error("Unable to Update right now")
        }

      }

      else{
       const {data} = await axios.post("/places", {
          title,
          address,photo,
          description,perks,extra,
          checkin,checkout,maxguests,price
        }) 
    
        try {
          if(data){
            toast.success('Place Added Successfully!')
            navigate('/account/places')
          }
          console.log("new Error")
        } catch (error) {
          toast.error("Unable to add right now")
        }
      }

  }


    useEffect(() => {

      if(id){
        axios.get("/places/new/"+id).then((res)=>{
          const{data} = res;
          settitle(data.title)
          setaddress(data.address);
          setdescription(data.description);
          setphoto(data.photo);
          setcheckin(data.checkin);
          setcheckout(data.checkout);
          setextra(data.extra);
          setperks(data.perks);
          setmaxguests(data.maxguests);
          setprice(data.price)
        })

      }

      else{
        settitle('');
        setaddress('');
          setdescription('');
          setphoto([]);
          setcheckin('');
          setcheckout('');
          setextra('');
          setperks('');
          setmaxguests(Number);
          setprice()
 
      }

    }, [id])


    function deletephoto(filename){
      setphoto([...photo.filter(pic=>pic !== filename)])
    }

    function coverphoto(filename){
      setphoto([filename,...photo.filter(pic=>pic !== filename)])
    }
    

  function uploadpic(ev){
    const files = ev.target.files
    const data = new FormData();

    for (let i=0; i<files.length;i++){
      data.append("photos",files[i])
    }

    axios.post("/upload",data,{
      headers:{"Content-Type":"multipart/form-data"}
    }).then(res=>{
        const imgurl = res.data;
        setphoto(prev=>{
          return [...prev,...imgurl]
        })
        
      
    })
  }
  


  return (
    <div className='p-2'>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    {action !=='new' && (
      <div>

      <div className='w-full flex items-center justify-center'>
      <Link to={"/account/places/new"}><button className='px-3 py-2 flex items-center gap-2 bg-red-500 text-white font-ssemibold rounded-full'>
      <LuPlus />Add new place</button> </Link> 
      </div>
      
      <Places/>

      </div>
    )}


    {
    action === 'new' && (
      <div>
        <form onSubmit={savesubmit} className='flex flex-col p-2 gap-4'>

        <div>
        <h2 className='font-bold sm:text-lg text-[16px]'>Title :</h2>
        <input type="text" placeholder='Enter a Suitable Title' value={title} onChange={ev=>settitle(ev.target.value)} className='w-[80vw] py-2 px-2 outline-none bg-gray-50 resize-none overflow-hidden font-bold text-[14px] sm:text-lg focus:animate-pulse rounded-lg focus:bg-transparent focus:border-red-500 border-2 border-gray-100 shadow-inner'/>
        </div>

        <div>
          <h2 className='font-bold sm:text-lg text-[16px]'>Address :</h2>
          <textarea rows={2} name="address" placeholder='Enter Your Place of Address here' value={address} onChange={ev=>setaddress(ev.target.value)} className='w-[80vw] p-2 bg-gray-50 focus:bg-white resize-none overflow-hidden focus:border-gray-200 shadow-inner border-2 border-gray-100 text-[14px] sm:text-lg outline-none rounded-lg'></textarea>
        </div>

        <div className='flex flex-col gap-2'>
          <h2 className='font-bold flex sm:text-lg items-center text-[16px] gap-2'>Add Photos <span className='text-[12px] font-medium sm:text-sm'><h2 className='text-gray-400'>(max of 12)</h2></span></h2>

  
        
        <div className='grid grid-cols-4 md:grid-cols-6 xl:grid-cols-12 gap-2'>

        
        {
          photo.length > 0 ? 
          photo.map((item,index)=>{
            return (
              <div key={index} className='relative hover:scale-110 hover:cursor-pointer transition-all duration-500 ease-in-out'>


              <FiTrash2 onClick={(ev)=>deletephoto(item)} className='absolute bottom-0 text-4xl right-4 hover:text-red-500 hover:bg-transparent bg-black bg-opacity-20 p-2 z-50 text-white rounded-lg'/> 


              <TbPhoto onClick={(ev)=>coverphoto(item)} className='absolute bottom-0 text-4xl left-0 hover:text-green-500 hover:bg-transparent bg-black bg-opacity-20 p-2 z-50 text-white rounded-lg' />
              <div key={item} className='md:w-28 w-20 h-20 md:h-24'>
                <img className='object-cover w-full h-full rounded-lg' src={`http://localhost:8000/${item}`} alt="" />
              </div>
            
            
            

              </div>
              
            )
          }) : ""
        }
        

        </div>
        
          
    

          <label className='flex items-center rounded-sm cursor-pointer justify-center border-2 p-2 md:p-5 md:w-40 w-28 h-28 gap-2 md:h-14 md:rounded-full border-dashed text-gray-400 bg-gray-50 border-gray-500'>
            <input type="file" name="image" className='hidden' multiple onChange={uploadpic}/>
          <MdOutlineFileUpload />
            <h2 className='text-[12px] md:text-sm'>Upload Pics</h2>
          </label>

        </div>

        <Perks selected={perks} onChange={setperks}/>
        

        <div>
          <h2 className='font-bold sm:text-lg text-[16px]'>Description :</h2>
          <p className='text-[12px] sm:text-base mt-2 text-zinc-400'>precised desciption needed only.</p>
          <textarea rows={5} name="" placeholder='Provide Description here' value={description} onChange={ev=>setdescription(ev.target.value)} className='w-[80vw] text-[14px] no-scrollbar sm:text-base resize-none scroll-smooth overflow-y-scroll p-2 bg-gray-50 focus:bg-white focus:border-gray-200 shadow-inner border-2 border-gray-100 outline-none rounded-lg'></textarea>
        </div>

        <div>
          <h2 className='font-bold sm:text-lg text-[16px]'>Extra info :</h2>
          <p className='text-[12px] sm:text-base text-zinc-400'>House rules,etc..</p>
          <textarea rows={2} name="" placeholder='Provide some Extra rules here' value={extra} onChange={ev=>setextra(ev.target.value)} className='w-[80vw] h-32 p-2 bg-gray-50 resize-none overflow-hidden focus:bg-white focus:border-gray-200 shadow-inner border-2 border-gray-100 text-[14px] sm:text-lg outline-none rounded-lg'></textarea>
        </div>
        
        <label className='sm:w-[20vw]'>
          <h2 className='font-semibold text-[14px] mb-2 sm:text-lg'>* Price Per Night Stay</h2>
          <input type="number" name="checkin" placeholder='Price' value={price} onChange={ev=>setprice(ev.target.value)} className='sm:w-full border-2 p-2 focus:bg-transparent bg-gray-50 outline-none rounded-2xl'/>
        </label>

        <div className='w-[80vw]'>
          <h2 className='font-semibold text-[14px] sm:text-lg'>Check In & Out Times</h2>
          <p className='text-[12px] sm:text-base text-zinc-400'>add check in and out times,remember to have some time window for cleaning the room bewtween guests </p>
        
        <div className='mt-2 grid grid-cols-2 sm:gap-1 gap-3 sm:grid-cols-3'>

        <label className='sm:w-[20vw]'>
          <h2 className='font-semibold text-[14px] sm:text-lg'>CheckIn </h2>
          <input type="number" name="checkin" value={checkin} onChange={ev=>setcheckin(ev.target.value)} className='sm:w-full border-2 p-2 focus:bg-transparent bg-gray-50 outline-none rounded-2xl'/>
        </label>

        <label className='sm:w-[20vw]'>
          <h2 className='font-semibold text-[14px] sm:text-lg'>CheckOut </h2>
          <label><input type="number" name="checkout" value={checkout} onChange={ev=>setcheckout(ev.target.value)} className='sm:w-full bg-gray-50 focus:bg-transparent border-2 p-2 outline-none rounded-2xl'/>
          </label>
        </label>

        <div className='sm:w-[20vw]'>
          <h2 className='font-semibold text-[14px] sm:text-lg'>Max Guests </h2>
          <input type="number" name="maxguests" min={1} value={maxguests} onChange={ev=>setmaxguests(ev.target.value)} className='sm:w-full bg-gray-50 focus:bg-transparent border-2 p-2 outline-none rounded-2xl' placeholder='Add no.of guests'/>
        </div>


        </div>
        </div>

          <div className='w-full flex justify-center mx-auto mb-4'>
            <button className='bg-red-500 w-1/4 mt-2 text-white px-3 py-1 rounded-full text-[14px] md:text-lg font-semibold'>Save</button>
          </div>
        

        </form>
      </div>
    )
    }



    </div>
  )
}

export default Placepage