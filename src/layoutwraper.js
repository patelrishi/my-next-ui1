"use client";
import {useSelector,useDispatch, Provider}  from "react-redux";
import {useEffect} from "react"
import { Login } from "./app/Login/page";
import { appReducer } from "./app/Redux/appReducer";
import { appStore } from "./app/Redux/store";


export default function layoutwraper({ children }) {

          const dispatch =useDispatch();
                useEffect(()=>{
                   if(typeof window !== "undefined" && sessionStorage?.user){
                    dispatch({ type:'LOGIN', payload:{isLogIn: true, user:sessionStorage?.user }})//if refresh also login the page
                  }
                },[]);

  const isLogged = useSelector((state)=>{  //false.appReducer.dispatch true | this converted to ==> true
    return state?.appReducer?.isLogIn //this means initialstate.appReducerinside.dispatchinsidepayload variable
  }) // false converted to true


  return isLogged ? children : <Login />
}

// (
//     <html lang="en">
//       <body>
//         <Provider store={appStore}>
//           {isLogged ? children : <Login/> }
//         </Provider>
//       </body>
//     </html>
//   );