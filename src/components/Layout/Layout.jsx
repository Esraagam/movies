import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import {Outlet, useNavigate} from 'react-router-dom'
export default function Layout({userdata ,setuserdata}) {
  let navigate=useNavigate();
  function logout(){
    localStorage.removeItem('usertoken');
    setuserdata(null);
    navigate('/login')
  }
  return <>
  <Navbar  logout={logout} userdata={userdata}/>
  <div className="container">
  <Outlet/>
  </div>
  <Footer/>
  </>   
}
