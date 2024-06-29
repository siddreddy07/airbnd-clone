import React, { useContext } from 'react'
import Navbar from '../Components/Navbar'
import { UserContext } from '../UserContext'


const Home = () => {

  const {user} = useContext(UserContext)

  return (
    <div>
        <h2>Home</h2>
    </div>
  )
}

export default Home