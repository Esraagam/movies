import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Register from './components/Register/Register'
import Movies from './components/Movies/Movies'
import Tv from './components/Tv/Tv'
import Profile from './components/Profile/Profile'
import People from './components/People/People'
import Login from './components/Login/Login'
import { useState } from 'react'
import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ItemDetails from './components/ItemDetails/ItemDetails'
import { Online,Offline } from 'react-detect-offline'




export default function App() {
  useEffect(()=>{ if(localStorage.getItem('usertoken')!==null)
       {
    saveUserData();
      }
   },[])
 
  const[userdata,setuserdata]=useState(null);
  function saveUserData(){
    let encodedToken=localStorage.getItem('usertoken');
    let decodedToken=jwtDecode( encodedToken);
    console.log(decodedToken);
    setuserdata(decodedToken);
  }
  let Roters=createBrowserRouter([
    {path:'/',element:<Layout setuserdata={setuserdata} userdata={userdata}/>,children:[
    {path:'home',element:<ProtectedRoute userdata={userdata}><Home /></ProtectedRoute>},  
    {path:'movies',element:<ProtectedRoute userdata={userdata}><Movies /></ProtectedRoute>} , 
    {path:'tv',element:<ProtectedRoute userdata={userdata}><Tv /></ProtectedRoute>}, 
    {path:'profile',element:<ProtectedRoute userdata={userdata} ><Profile userdata={userdata}/></ProtectedRoute>} ,
    {path:'itemDetails/:id/:media_type',element:<ProtectedRoute userdata={userdata}><ItemDetails userdata={userdata}/></ProtectedRoute>} ,
    {path:'people',element:<ProtectedRoute userdata={userdata}><People/></ProtectedRoute>},  
    {path:'login',element:<Login saveUserData={saveUserData}/> }, 
    {index:true,element:<Register/>}  
       
    ]}
  ])
  return<>
  <Offline><div className='offline'>you are offline</div></Offline>
  <RouterProvider router={Roters}/> 
  </> 
    
  
}
