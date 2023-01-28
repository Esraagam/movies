import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Joi from 'joi'

export default function Register() {
  let  navigate=useNavigate();
    const[errorList,seterrorList]=useState([]) 
    let [isloading,setisloading]=useState(false)
    const[error,seterror]=useState('')
    const[user,setuser]=useState({
        first_name:'',
        last_name:'',
        age: 0,
        password :'',
        email:''
    });

    function getUserData(eventinfo){
     let myUser={...user};
     myUser[eventinfo.target.name]=eventinfo.target.value;
     setuser(myUser);
     console.log(myUser)
       
    }

   async function sendRegisterDataToApi(){
       let{data}=await axios.post(`https://route-movies-api.vercel.app/signup`,user);
       console.log(data)
       if(data.message ==='success'){
        setisloading(false);
        navigate('/login')
        // login|home
       }
       else{
        setisloading(false);
         seterror(data.message)
       }
    }

    function submitRegistForm(e){
      e.preventDefault();
      setisloading(true)
      let validation=validateRegisterForm();
      if(validation.error){
        setisloading(false)
        seterrorList(validation.error.details)
      }else{
           sendRegisterDataToApi()
      }
     
    }

    function validateRegisterForm(){
      let schema=Joi.object({
        first_name:Joi.string().min(3).max(10).required(),
        last_name:Joi.string().min(3).max(10).required(),
        age:Joi.number().min(16).max(50).required(),
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
  <form onSubmit={submitRegistForm}>
    <label htmlFor='first_name'>first_name:</label>
    <input onChange={getUserData}type='text' className='form-control my-2 my-input' id='first_name' name='first_name'></input>
    <label htmlFor='last_name'>last_name:</label>
    <input onChange={getUserData} type='text' className='form-control my-2 my-input' id='last_name' name='last_name'></input>
    <label htmlFor='age'>age:</label>
    <input onChange={getUserData} type='number' className='form-control my-2 my-input' id='age' name='age'></input>
    <label htmlFor='password'>password:</label>
    <input onChange={getUserData} type='password' className='form-control my-2 my-input' id='password' name='password'></input>
    <label htmlFor='email'>email:</label>
    <input onChange={getUserData} type='email' className='form-control my-2 my-input' id='email' name='email'></input>

    <button type='submit' className='btn btn-info'>{isloading===true?<i className='fas fa-spinner fa-spin'></i>:'registar'}</button>
  </form>
  </>
}
