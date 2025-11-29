import React, { useState } from "react";
import './Model.css'
import { useDispatch, useSelector } from "react-redux";
import { Ajax } from "../Services/Ajax";


export const Model = () => {

    const [data, setData] = useState(useSelector((state) => state?.appReducer?.rowdata) || {})

    const dispatch = useDispatch()

    //cancel fun
    const fnCancel = () => {
        alert('Cancel');                          //false means closing the card 
        dispatch({ type: 'MODEL', payload: { isShowModel: false, rowdata: {} } })
    }
    //handlechange fun
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })

    }
    //update fun
    const fnUpdate = async() => {
        try {
            const id = data._id;
            delete data?._id  //predefine keyword this _id not changed that why am using delete key word it delete and genered new one
            const dataObj = {
                'data': data
            }
            const res = await Ajax.sendPutReq(`/std/update-student?id=${id}`, dataObj) //ID mentioned in query string parameter in my backend 

            const { acknowledged, modifiedCount } = res?.data;
            if (acknowledged && modifiedCount) {
                alert("Updated success")

                dispatch({ type: 'MODEL', payload: { isShowModel: false, rowdata: {} } }) // this is whenever updated that time Card is closed
                dispatch({ type: 'GET_STUDENTSFUN' }) // this is for immediately update with in the page without refreshing
            } else {
                alert('Updated Failed')
            }
        } catch (ex) {
            console.error(ex.message)
        }
    }
    return <>
        <div className="update-card">
            <div className="update-mask" ></div>
            <div className=" update-modelContent" >
                <h4 >
                    <div>
                        <h5>Update the Data</h5> {/*value={data.name} means it is showing data inside input element */}
                        <p>
                            <b>Name: </b> <input type='text' value={data.name} name='name' placeholder='Name' onChange={handleChange} />
                        </p>
                        <p>
                            <b>Password: </b> <input type='number' value={data.password} name='password' placeholder='Password' onChange={handleChange} />
                        </p>
                        <p className='textarea'>
                            <b>Location: </b> <textarea type='text' value={data.location} name='location' placeholder='Location' onChange={handleChange} />
                        </p>
                        <div>
                         <button className='model-btn' onClick={fnUpdate}> Update </button>
                         <button className="model-btn" onClick={fnCancel} >Cancel</button>
                        </div>
                        
                    </div>
                </h4>
            </div>
        </div>

    </>
};