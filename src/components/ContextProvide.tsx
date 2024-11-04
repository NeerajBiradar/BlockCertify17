import {createContext, useState, ReactNode, FC, useEffect } from 'react'
import axios from 'axios';


type contextprops={
    loggedIn:boolean;
    setLoggedIn:React.Dispatch<React.SetStateAction<boolean>>;
    user:any;
    setUser:React.Dispatch<React.SetStateAction<any>>
}


export const Context12 = createContext<contextprops | undefined>(undefined);

export const ContextProvide : FC<{ children: any }> = ({ children })=> {
  const [loggedIn,setLoggedIn]=useState(false);
  const [user,setUser]=useState(null);
  useEffect(()=>{
    if(localStorage.getItem('token')){
      axios({
        method:'get',
        url:'http://localhost:3000/api/verify-token',
        headers:{
          'Authorization':localStorage.getItem('token')
        }
      })
      .then((response)=>{
        
        if(response.status===401){
          localStorage.removeItem('token');
          setLoggedIn(false);
        }
        else{
          
          setLoggedIn(true);
          
        }
      })
    }
    
  },[loggedIn])
  return (
    <Context12.Provider value={{loggedIn,setLoggedIn,user,setUser}}>
        {children}
    </Context12.Provider>

  )
}