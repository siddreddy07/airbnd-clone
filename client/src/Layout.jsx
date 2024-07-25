import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {

  const [searchquery,setsearchquery] = useState('');

  const handlesearch = (query)=>{
    setsearchquery(query);
  }
  return (
    <div>
        <Navbar onSearch={handlesearch}/>
        <Outlet searchquery={searchquery}/>
    </div>
  )
}

export default Layout