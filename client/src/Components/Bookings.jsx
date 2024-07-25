import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loginpage from '../pages/Loginpage'

const Bookings = () => {

  const {user} = useContext(UserContext)
  const [places,setplaces] = useState([]);


  const uid = user.id;
  useEffect(() => {
    axios.get("/booking/"+uid).then((res)=>{
     const {data} = res;
     setplaces(data);

    })
  }, [user])



  return (
    <div className='px-10 h-screen w-[100vw]'>
      <div className='flex flex-wrap items-center justify-center lg:justify-normal mb-8 gap-20 lg:gap-14 xl:gap-12'>
      {
        places.length>0 && places.map((place,index)=>{
            
            return <div key={index}>
              <Link to={"/account/place/"+place.property._id}>
             <div className='w-80 rounded-lg overflow-hidden'>
            {place.property.photo.length > 0 && (
              <div className='carousel w-full mb-1 h-64'>
                         
                {
                  place.property.photo.map((item,index)=>{
                    return <div key={index} className='w-full relative h-64 carousel-item flex overflow-hidden'>
                  <img src={`http://localhost:8000/${place.property.photo[index]}`} className='object-fit h-64 w-full hover:scale-125 transition-all cursor-pointer ease-in-out duration-700' alt="" />
                  <div className='absolute z-100 bottom-0 px-3 py-1 text-center rounded-full right-0 bg-black bg-opacity-50'><span className='text-zinc-200 transition-all animate-bounce duration-500 ease-in-out font-semibold'>{index+1}/{place.property.photo.length}</span></div>
                </div>
                })
              }
                  
              </div>
            )}
            <div>
              <h2 className='font-semibold text-lg'>{place.property.title}</h2>
              <div className='flex items-end justify-between'>
              <div>
              <h2 className='font-normal text-gray-500 text-base'>{place.address}</h2>
              <div className='flex flex-col'>
              <h2 className='font-normal text-gray-600 text-base'>Checkin Date : {new Date(place.checkin).toISOString().split('T')[0]} </h2>
              <h2 className='font-normal text-gray-600 text-base'>Checkout Date : {new Date(place.checkout).toISOString().split('T')[0]} </h2>
              </div>
              <h2 className='font-normal text-gray-500 text-base'>max-guest : <span className='font-normal text-gray-700 text-base'>{place.guests}</span> members</h2>    
              </div>

              <div>
                <h2 className='font-semibold'>₹{place.property.price}/Night</h2>
              </div>
              </div>
            </div>
              <h2>Booking Id : <span className='font-medium'>{place._id}</span></h2>
              <h2>Booked UserId : <span className='font-medium'>{place.user}</span></h2>
          
          </div>
            </Link>
            </div>
        })
      }
      </div>
    </div>
    
  )
}

export default Bookings