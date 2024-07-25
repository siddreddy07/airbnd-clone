import React from 'react'

const Datepicker = ({value,onChange}) => {


  return (
    <div className='flex gap-2 bg-white border-2 p-2 divide-x rounded-xl'>       
        <label className='bg-white'>
            <input type="date" name="" id="" value={value} required={true} className='outline-none' onChange={onChange}
            onClick={(e)=>e.target.showPicker()}/>
        </label>
        <hr />

    </div>
  )
}

export default Datepicker

