import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify'; 
import { assets } from '../assets/assets'; 
import { StoreContext } from '../Context/StoreContextProvider';


const Orders = () => {
 

  const [orders, setOrders] = useState([]); // State to store the list of orders
  const {url}=useContext(StoreContext)
  const token=localStorage.getItem("token")
  // Function to fetch all orders from the backend
  const fetchAllOrders = async () => {

    try {
      const response = await axios.get(`${url}/api/order/list`,{headers:{token,'ngrok-skip-browser-warning': 'true'}});
      if (response.data.success) {
        setOrders(response.data.data); 
      } else {
        toast.error("Error fetching orders"); 
      }
    } catch (error) {
      console.error("Error:", error); 
      toast.error("Error fetching orders"); 
    }
  };

 
  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: e.target.value
      },{headers:{token,'ngrok-skip-browser-warning': 'true'}});
      if (response.data.success) {
        await fetchAllOrders(); 
      }
    } catch (error) {
      console.error("Error:", error); 
      toast.error("Error updating status"); 
    }
  };

 
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className='px-[80px] mt-[60px]'>
      <h3 className='text-[30px] font-bold text-[tomato] mb-[30px]'>Order Page</h3>
      <div className=' flex flex-col gap-6'>
       
        {orders.map((order, index) => {
          return (
            <div key={index} className='grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-7 text-[#454545] items-center border px-[20px] py-[10px] border-[tomato]'>
              
              <img src={assets.parcel_icon} alt='icon'></img>
              <div >
                <p className='order-item-food'>
             
                  {order.items.map((item, index) => {
                    return (
                      <span key={index}>
                        {item.name} X {item.quantity}
                       
                        {index !== order.items.length - 1 ? ", " : ""}
                      </span>
                    );
                  })}
                </p>
                <p className='order-item-name'>
                  
                  {order.address.firstname} {order.address.lastname}
                </p>
                <div className='order-item-address'>
                  
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                  </p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
             
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
            
              <select className='bg-[#ffe8e4] border border-[tomato] px-[10px] py-[10px] outline-none w-[200px]' onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                <option value="Food processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;