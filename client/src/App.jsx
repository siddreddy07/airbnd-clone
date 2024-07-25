import React from 'react'
import { BrowserRouter ,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Layout'
import Loginpage from './pages/Loginpage'
import Signup from './pages/Signup'
import { UserContextProvider } from './UserContext'

import toast, { Toaster } from 'react-hot-toast';

import axios from 'axios'

import Accountpage from './pages/Accountpage'
import Placepage from './Components/Placepage'
import Viewplace from './Components/Viewplace'
import Checkout from './Components/Checkout'
import Payments from './pages/Payments'

axios.defaults.baseURL='http://localhost:8000'
axios.defaults.withCredentials = true


const App = () => {
  return (
<>
    <UserContextProvider>
          <Toaster
                  position="top-center"
                  reverseOrder={false}
                  />
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/login' element={<Loginpage/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/account/:subpage?' element={<Accountpage/>}/>  
          <Route path='/account/:subpage/:action' element={<Accountpage/>}/> 
          <Route path='/account/place/:id' element={<Viewplace/>}/> 
          <Route path='/account/checkout/:id' element={<Checkout/>}/> 
          <Route path='/account/:subpage/:action/:id' element={<Accountpage/>}/> 
          <Route path='/account/:subpage/:action/:id/:item' element={<Accountpage/>}/> 
          </Route>
          <Route path='/payments/:uid' element={<Payments/>}/> 
        </Routes>
        </BrowserRouter>

    </UserContextProvider>



</>

  )
}

export default App