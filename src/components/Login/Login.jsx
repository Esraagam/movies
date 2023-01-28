import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Joi ,{func}from 'joi'

export default function Login({saveUserData}) {
  let  navigate=useNavigate();
    const[errorList,seterrorList]=useState([]) 
    let [isloading,setisloading]=useState(false)
    const[error,seterror]=useState('')
    const[user,setuser]=useState({
        
        password :'',
        email:''
    });

    function getUserData(eventinfo){
     let myUser={...user};
     myUser[eventinfo.target.name]=eventinfo.target.value;
     setuser(myUser);
     console.log(myUser)
       
    }

   async function sendLoginDataToApi(){
       let{data}=await axios.post(`https://route-movies-api.vercel.app/signin`,user);
       console.log(data)
       if(data.message ==='success'){
        setisloading(false);
        localStorage.setItem('usertoken',data.token);
        saveUserData();
        navigate('/home')
        // Login|home
       }
       else{
        setisloading(false);
         seterror(data.message)
       }
    }

    function submitLoginForm(e){
      e.preventDefault();
      setisloading(true)
      let validation=validateLoginForm();
      if(validation.error){
        setisloading(false)
        seterrorList(validation.error.details)
      }else{
           sendLoginDataToApi()
      }
     
    }

    function validateLoginForm(){
      let schema=Joi.object({
        
        email:Joi.string().email({tlds:{allow:['com','net']}}).required(),
        password:Joi.string().pattern(/^[A-Z][a-z]{3,6}/)
      }
      )
      console.log(schema.validate(user,{abortEarly:false}))
      return schema.validate(user,{abortEarly:false})
    }
  return <>
  {errorList.map((err,index)=>{
    if(err.context.label==='password'){
      return <div key={index} className='alert alert-danger my-2'>password invalid</div>
    }else
    {
      return <div key={index} className='alert alert-danger my-2'>{err.message}</div>
    }
  }
 )
}
  {error.length>0?<div className='alert alert-danger my-2'>{error}</div>:''}
  <form onSubmit={submitLoginForm}>
    <label htmlFor='password'>password:</label>
    <input onChange={getUserData} type='password' className='form-control my-2 my-input' id='password' name='password'></input>
    <label htmlFor='email'>email:</label>
    <input onChange={getUserData} type='email' className='form-control my-2 my-input' id='email' name='email'></input>

    <button type='submit' className='btn btn-info'>{isloading===true?<i className='fas fa-spinner fa-spin'></i>:'Login'}</button>
  </form>
  </>
}
