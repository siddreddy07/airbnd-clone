import React, { useContext, useEffect, useState } from 'react'

import { UserContext } from '../UserContext'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'


const Home = () => {

  const {user} = useContext(UserContext)
  const [places,setplaces] = useState([]);
  const location = useLocation


  useEffect(() => {
    axios.get('/places').then(response=>{
      setplaces(response.data)
    })    
  }, [location])
  


  return (

    <div className='mt-8 w-full sm:px-6 md:px-8 h-full'>


      <div className='w-full rounded-lg flex items-center justify-center flex-col sm:flex-row sm:gap-8 sm:items-start sm:justify-normal gap-4 overflow-hidden'>

      {
        places.length > 0 && places.map((place,index)=>{
          return <div key={index}>
              <Link to={"/account/place/"+place._id}>
             <div className='w-80 rounded-lg overflow-hidden'>
            {place.photo.length > 0 && (
              <div className='carousel w-full rounded-xl mb-1 h-64'>
                         
                {
                  place.photo.map((item,index)=>{
                    return <div key={index} className='relative w-full h-64 carousel-item flex overflow-hidden'>
                  <img src={`http://localhost:8000/${place.photo[index]}`} className='object-fit h-64 w-full hover:scale-125 transition-all cursor-pointer ease-in-out duration-700' alt="" />
                  <div className='bg-black bottom-0 right-1 absolute px-3 py-1 rounded-full bg-opacity-20'><span className='text-zinc-300 font-semibold text-[14px]'>{index+1}/{place.photo.length}</span></div>
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
              <h2 className='font-semibold'>₹{place.price}/Night</h2>
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

export default Home