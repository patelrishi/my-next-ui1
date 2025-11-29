"use client"
import axios from "axios";

const BASEURL ="https://my-server-b1r2.vercel.app"           // "http://localhost:3030"


 if(typeof window !== "undefined"){

    // add a request interceptor
    axios.interceptors.request.use(function (req) {
        //Do something before request sent
       req.headers.Authorization = sessionStorage?.token;
        return req
    }, function (error) {
        return Promise.reject(error)
    })

    //add a response interceptor
    axios.interceptors.response.use(function (res) {
        //any status code that lie within the range of 2xx cause this function 
        //Do someting with response Data
        return res
    }, function (error) {
        //Do something with request error
        return Promise.reject(error)
    })
}

export class Ajax {
    static sendGetReq(url) {
        return axios.get(BASEURL + url)
    }
    static sendPostReq(url, data) { // means url ==> /std/login ,| data => input values ex: uid: vamshi password: vamshi;
        return axios.post(BASEURL + url, data) // means BASEURL+url =>http://localhost:3030+/std/login  | data => input values;
    }
    static sendPutReq(url, data) {
        return axios.put(BASEURL + url, data)
    }
    static sendDeleteReq(url, data) {
        return axios.delete(BASEURL + url, data)
    }
}

// i am usig class for all function work for same cause  so that all functions keep in single entity
// every function call you use only class name easy way