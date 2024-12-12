import React, { useContext, useEffect } from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {StoreContext} from '../Context/StoreContextProvider'
import axios from 'axios'

const Verify = () => {
    const [searchParams,setSearchParams]=useSearchParams()

    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");

    const {url,token,setCartItem}=useContext(StoreContext);

    const navigate=useNavigate();

    const verifyPayment=async()=>{
        console.log(" verified token",token)
        const response=await axios.post(url+"/api/order/verify",{success,orderId},{headers:{token}})
        
        if(response.data.success){
            setCartItem({});
            navigate("/myorders")
        }
        else{
            navigate("/")
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[token])
  return (
    <div className='min-h-[60vh] grid items-center justify-center '>
    <div className='w-[100px] h-[100px] self-center border-[5px] rounded-[50%] border-[tomato] animate-rotate '></div>
      
    </div>
  )
}

export default Verify
