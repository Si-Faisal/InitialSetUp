import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';




export const notify = (msg,navigate) =>{
   
    
    toast(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
      
      setTimeout(() => {
        
        navigate("/");
      }, 5000); 
  } 


  const ToastifyContainer= ()=>{
   
    return (<ToastContainer position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"/> )

    
  }

  export default ToastifyContainer;
