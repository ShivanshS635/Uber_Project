import React from 'react';
import Home from './pages/Home';
import Start from './pages/Start';
import Riding from './pages/Riding';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import UserLogout from './pages/UserLogout';
import CaptainHome from './pages/CaptainHome';
import CaptainLogin from './pages/CaptainLogin';
import { Routes, Route } from 'react-router-dom';
import CaptainSignup from './pages/CaptainSignup';
import CaptainLogout from './pages/CaptainLogout';
import UserProtectWrapper from './pages/UserProtectWrapper';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper';
import CaptainRiding from './pages/CaptainRiding';
import CaptainProfile from './pages/CaptainProfile';




const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/captainLogin' element={<CaptainLogin/>}/>
        <Route path='/captainSignup' element={<CaptainSignup/>}/>
        <Route path='/riding' element={<Riding/>}/>

        <Route path='/home' element={
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>
        }/>

        <Route path='/users/logout' element={
          <UserProtectWrapper>
            <UserLogout/>
          </UserProtectWrapper>
        }/>

        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome/>
          </CaptainProtectWrapper>
        }/>

        <Route path='/captains/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout/>
          </CaptainProtectWrapper>
        }/>

        <Route path='/captain-profile' element={
          <CaptainProtectWrapper>
            <CaptainProfile/>
          </CaptainProtectWrapper>
        }/>

        <Route path='/captain-riding' element={<CaptainRiding/>}/>
        
      </Routes>
    </div>
  )
}

export default App