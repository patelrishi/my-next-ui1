"use client"
import Link from 'next/link';
import React from 'react';
import './NavBar.css';
import { useDispatch } from 'react-redux';


const NavBar = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    const boolean = confirm('Are You Sure..') // you are clicked it's Logout.
    if (boolean) {
      sessionStorage.clear() //uid and password and token all are remove from sessionStorage.
      dispatch({ type:"LOGIN", payload:{isLogIn:false} }) //whenevr click on this logout init inside stored isLogIn (true) data changed to false.
    }
  }
  return (
    <>
      <div className='navbar'>
        <div className='list' >
          <Link href='/' >Home</Link>
          <Link href='/Register'>Register</Link>
          <Link href='/GetStudents'>GetStudents</Link>
        </div>
        <div className='logout_container'>
          <button onClick={handleClick}>Logout</button>
        </div>
      </div>
    </>
  )
}
export default NavBar;