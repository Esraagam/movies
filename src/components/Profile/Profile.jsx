import React from 'react'

export default function Profile({userdata}) {

    let {first_name,last_name,age,email}=userdata;

  return <>
  <h4>name:{first_name} {last_name}</h4>
  <h4>age:{age}</h4>
  <h4>email:{email}</h4>
  </>
   
}
