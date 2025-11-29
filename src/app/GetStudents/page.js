"use client";
import React, { useEffect, useState } from 'react'
import NavBar from '../Navbar/NavBar';
import '../GetStudents/GetStudents.css';
import { Ajax } from '../Services/Ajax';
import { useDispatch, useSelector } from 'react-redux';
import { Model } from '../Model/page';


const GetStudents = () => {
  const [std, setStd] =useState([])
  
  const dispatch = useDispatch();
  const list = useSelector(state => state?.appReducer?.students) //we can get the all students data from appStore
  const isShow = useSelector((state)=> state?.appReducer?.isShowModel) 

    useEffect(()=>{
    dispatch({type:'GET_STUDENTSFUN'})
    },[])

    const handleGetStudents=()=>{
        setStd(list) // this is the reason for delayed ur API call update. 
  }
  //update data fun
  const handleEdit =(row)=>{
       alert(`${row.name}`)
       dispatch({type:'MODEL', payload:{isShowModel: true, rowdata:row}})
  }
  //delete data fun
  const handleDelete = async(row)=>{
    alert("Are you Sure!")
    const id =row._id;
    const res = await Ajax.sendDeleteReq(`/std/delete-student/${id}`) //ID mention in path parameter in backend side
    const {acknowledged, deletedCount} =res?.data
    if(acknowledged && deletedCount){
      dispatch({type:'GET_STUDENTSFUN'})// this called the fun after updated
      alert('Delete Success')
    }else{
      alert('Delete Failed')
    }
  }

  return (
    <>
    <NavBar />
     <div className='getstd_btn_container' > { list?.length > 0 && <div>
         <button className='getstd_btn' onClick={handleGetStudents}>GetStudents</button>
         <button className='refresh_btn' onClick={handleGetStudents}>Refresh</button>
        </div>
     }
     </div>{
      isShow && <Model/>
     }
     

       { std?.length > 0 ?
        <div className='table-container'>
         <table className='table'>
          <thead>
           <tr>
             <th>S.NO</th>
             <th>Name</th>
             <th>Password</th>
             <th>Location</th>
             <th>Edit</th>
             <th>Delete</th>  
           </tr>
          </thead>
          <tbody> 
            {
              std?.length > 0 && std?.map((object, index)=>{
              const {_id,name,location,password} = object;
              return  <tr key={_id}>
                <td>{index+1}</td>
                <td>{name}</td>
                <td>{password}</td>
                <td>{location|| '-'}</td>
                <td><button className='edit_btn' onClick={()=>handleEdit(object)} >Edit</button></td>
                <td><button className='delete_btn' onClick={()=>handleDelete(object)} >Delete</button></td>
              </tr>
             })
            }
          </tbody>
        </table>
        </div> : "if you want Students Data Wait a while...!"
      }
     </>
    
  )
}
export default GetStudents;

// try{
//         const res = await fetch('https://my-server-b1r2.vercel.app/std/get-student/',{
      
//         method:'get',
//         headers:{'content-type':'applications/json',}
//       })
//       const result =await res.json()
//       setStd(result)
//       console.log(std)
//     }catch(err){
//       console.error(err.message)
//     }


// const getUsers = async()=>{
    //   try{
    //     const res = await Ajax.sendGetReq('/std/get-student')

    //     setStd(res?.data)
    //   } catch(err){
    //      console.error(err.message)
    //     }
    // }