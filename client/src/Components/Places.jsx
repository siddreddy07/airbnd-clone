import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Places = () => {

  const [places,setplaces] = useState([]);
  useEffect(() => {
      axios.get("/user-places").then(({data})=>{
        setplaces(data);
      })
  }, [])
  

  return (
    
    <div className='mt-8 w-full h-full'>


      <div className='w-full rounded-lg flex items-center justify-center flex-col sm:flex-row sm:gap-8 sm:items-start sm:justify-normal gap-4 overflow-hidden'>

      {
        places.length > 0 && places.map((place,index)=>{
          return <div key={index}>
              <Link to={"/account/places/new/"+place._id}>
             <div className='w-80 rounded-lg overflow-hidden'>
            {place.photo.length > 0 && (
              <div className='carousel w-full mb-1 h-64'>
                         
                {
                  place.photo.map((item,index)=>{
                    return <div key={index} className='w-full relative h-64 carousel-item flex overflow-hidden'>
                  <img src={`http://localhost:8000/${place.photo[index]}`} className='object-fit h-64 w-full hover:scale-125 transition-all cursor-pointer ease-in-out duration-700' alt="" />
                  <div className='absolute z-100 bottom-0 px-3 py-1 text-center rounded-full right-0 bg-black bg-opacity-50'><span className='text-zinc-200 transition-all animate-bounce duration-500 ease-in-out font-semibold'>{index+1}/{place.photo.length}</span></div>
                </div>
                })
              }
                  
              </div>
            )}
            <div>
              <h2 className='font-semibold text-lg'>{place.title}</h2>
              <div className='flex items-end justify-between'>
              <div>
              <h2 className='font-normal text-gray-500 text-base'>{place.address}</h2>
              <div className='flex'>
              <h2 className='font-normal text-gray-600 text-base'>{place.checkin} AM</h2>
              <span> - </span>
              <h2 className='font-normal text-gray-600 text-base'>{place.checkout} PM</h2>
              </div>
              <h2 className='font-normal text-gray-500 text-base'>max-guest : <span className='font-normal text-gray-700 text-base'>{place.maxguests}</span> members</h2>    
              </div>

              <div>
                <h2 className='font-semibold'>₹{place.price}</h2>
              </div>
              </div>
            </div>
          
          </div>
            </Link>
            </div> 
        })
        
      }

      </div>


    </div>

  )
}

export default Places