import React from 'react'
import Homepage from './Homepage'
import UserHomepage from './UserPage'
import {Route,Routes} from 'react-router-dom'
export default function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/Homepage' element={<UserHomepage/>}/>
    </Routes>
    
    </>
  )
}
