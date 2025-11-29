"use client"
import React from 'react';
import "./Register.css";
import NavBar from '../Navbar/NavBar';
import { useState } from "react";
import { Ajax } from '../Services/Ajax';
import { useDispatch } from 'react-redux';

 const Register = ()=>{
    const [data, setData] =useState({})
    
    const dispatch= useDispatch()

    const handleChange = (e) => {
        const {name, value} =e.target;
        setData({...data , [name]: value})
    }

    const handleClick = async() => {
        const dataObj = {
            'data':data
        }
        try{
            
            const res = await Ajax.sendPostReq('/std/student',dataObj)
            
            const {acknowledged, insertedId}= res?.data;
            if(acknowledged && insertedId){
                dispatch({type:'GET_STUDENT'}) //it is whenever  i register new user it update immediately 
                alert('successfully Register')
            } else{
                alert('Registration failed')
            }

        } catch(err){
            console.error(err.message)
        }

    }
    return (
        <>
        <NavBar />
        <div className='main' >

            <div className='card'>
                <h1>Registration Form</h1>
            
                    <p>
                        <b>Name: </b> <input type='text'name='name' placeholder='Name' onChange={handleChange} />
                    </p>
                    <p>
                        <b>Password: </b> <input type='number' name='password' placeholder='Password' onChange={handleChange} />
                    </p>
                    <p className='textarea'>
                        <b>Location: </b> <textarea type='text' name='location' placeholder='Location' onChange={handleChange} />
                    </p>
                <button className='register_btn' onClick={handleClick} >Register</button>
            </div>
        </div>
        </>
    )
}

export default Register;


// const res =  await fetch("http://localhost:3030/std/student",{  //https://my-server-4kvq.vercel.app
//                 method:"post",
//                 headers:{'content-type':'application/json'},
//                 body:JSON.stringify(dataObj)})