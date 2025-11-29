"use client";

import React, { useEffect, useState } from 'react';
import './Login.css';
import { Ajax } from '../Services/Ajax';
import { useDispatch } from 'react-redux';

export const Login = () => {

  const [data, setData] = useState({uid:"", pswd:""});
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { id, value } = e.target;
     setData((prev)=>({...prev, [id]:value }))

  }

  const handleClick = async () => {
    try {
      const res = await Ajax.sendPostReq("/std/login",data)
      
      if(res?.data?.length > 0){
        const user = res?.data?.[0]?.uid;
        const token = res?.data?.[0]?.token;
      
          if(typeof window !== "undefined"){
              try{
                sessionStorage.setItem("user",user);
                sessionStorage.setItem("token",token);
             }catch(err){
                console.warn("sessionIssue: ", err)
              }
          }

        dispatch({type:'LOGIN', payload:{isLogIn:true, user, token} })
      }else{
        alert('plz enter proper inputs')
      }

    } catch(ex){
      console.error("login error: ", ex)

    } finally{
      console.log("success")
    }
  };
  return (
    <main>
      <div className='main_container' >
        <div className='card' >
          <h1>Log In</h1>
          <p className='inputbox'>
            <b>User id:</b> <input type='text' id='uid' placeholder='uid' onChange={handleChange} />
          </p>
          <p className='inputbox'>
            <b>Password:</b> <input type='password' id='pswd' placeholder='password' onChange={handleChange} />
          </p>
          <button className='btn' onClick={handleClick} >LogIn</button>
        </div>
      </div>
    </main>
  )
}



    //if(typeof window !== 'undefined'){
          // sessionStorage.user = res?.data?.[0]?.uid   //the uid stored in SessionStorage
        // sessionStorage.token = res?.data?.[0]?.token //the server token stored in sessionStorage.
       //  }



    