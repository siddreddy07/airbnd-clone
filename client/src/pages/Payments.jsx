import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ClockLoader from "react-spinners/ClockLoader";
import { UserContext } from '../UserContext';
import Loginpage from './Loginpage';
import Bookings from '../Components/Bookings';
import axios from 'axios';

const Payments = () => {

const {user} = useContext(UserContext)
const {uid} = useParams()
const location = useLocation()
const navigate = useNavigate()
const {data1,CheckoutDate, CheckinDate, guests} = location.state || {}
const [success,setsuccess] = useState(false)











  return (
    <div>
    {
        user && (
        
        <div className='flex w-full flex-col h-screen items-center justify-center'>
            <ClockLoader
      color="#ff0707"
      size={90}
    />
        <p className='font-medium text-lg'>Confirming Payment Status</p>
        <p className='font-medium text-lg'>Redirecting to Bookings page</p>

    
        </div>
        

    )}

    {
        !user && (
            <Loginpage/>
        )
    }
    </div>
  )
}

export default Payments