import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
   if(!localStorage.getItem('usertoken')){
       console.log('yes');
       return<Navigate to='/Login'/>
   }
   else{
    console.log('no')
    return props.children;
   }
 
}
