import React from 'react'
import { IoWifiOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import { TbToolsKitchen3 } from "react-icons/tb";
import { BiSolidParking } from "react-icons/bi";
import { LiaDoorOpenSolid } from "react-icons/lia";
const Perks = ({selected,onChange}) => {

  function handlecheck(ev){
    console.log(ev.target.name)
    console.log(ev.target.checked)
    const {name,checked} = ev.target
    if(checked){
      onChange([...selected,name])
    }

    else{
     onChange([...selected.filter(selectedname => selectedname !== name)])
    }
  }

  return (
    <div>
        <div className='w-[80vw] mt-2'>
          
          <h2 className='text-lg font-semibold'>Perks : </h2>
          <p className='text-[12px] sm:text-base text-zinc-400'>Select all perks at your place</p>

          <div className='grid mt-4 mb-4 grid-cols-2 md:grid-cols-4 gap-3'>
            <label className='flex border-2 text-[14px] sm:text-lg sm:px-4 p-2 sm:py-2 rounded-2xl items-center gap-2'>
              <input type="checkbox" checked={selected.includes('wifi')} name='wifi' onChange={handlecheck} className='accent-red-500 sm:h-4 w-2 h-2 sm:w-4' id='check'/>
              <span className='flex gap-2 items-center'><IoWifiOutline />Wifi</span>
            </label>

            <label className='flex border-2 text-[14px] sm:text-lg sm:px-4 p-2 sm:py-2 rounded-2xl items-center gap-2'>
              <input type="checkbox" checked={selected.includes('tv')} name='tv' onChange={handlecheck} className='accent-red-500 sm:h-4 w-2 h-2 sm:w-4'/>
              <span className='flex gap-2 items-center'><PiTelevisionSimpleFill />TV</span>
            </label>

            <label className='flex border-2 text-[14px] sm:text-lg sm:px-4 p-2 sm:py-2 rounded-2xl items-center gap-2'>
              <input type="checkbox" checked={selected.includes('pets')} name='pets' onChange={handlecheck} className='accent-red-500 sm:h-4 w-2 h-2 sm:w-4'/>
              <span className='flex gap-2 items-center'><MdOutlinePets />Pets</span>
            </label>
            <label className='flex border-2 text-[14px] sm:text-lg sm:px-4 p-2 sm:py-2 rounded-2xl items-center gap-2'>
              <input type="checkbox" checked={selected.includes('kitchen')} name='kitchen' onChange={handlecheck} className='accent-red-500 sm:h-4 w-2 h-2 sm:w-4'/>
              <span className='flex gap-2 items-center'><TbToolsKitchen3 />Kitchen</span>
            </label>
            <label className='flex border-2 text-[14px] sm:text-lg sm:px-4 p-2 sm:py-2 rounded-2xl items-center gap-2'>
              <input type="checkbox" checked={selected.includes('entrance')} name='entrance' onChange={handlecheck} className='accent-red-500 sm:h-4 w-2 h-2 sm:w-4'/>
              <span className='flex gap-2 items-center'><LiaDoorOpenSolid />Entrance</span>
            </label>
            <label className='flex border-2 text-[14px] sm:text-lg sm:px-4 p-2 sm:py-2 rounded-2xl items-center gap-2'>
              <input type="checkbox" checked={selected.includes('parking')} name='parking' onChange={handlecheck} className='accent-red-500 sm:h-4 w-2 h-2 sm:w-4'/>
              <span className='flex gap-2 items-center'><BiSolidParking />Parking</span>
            </label>
          </div>

        </div>
    </div>
  )
}

export default Perks