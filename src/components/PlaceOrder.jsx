
import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';


import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContextProvider';


const PlaceOrder = () => {
  
  const { totalCartAmount, token, foodlist, cartItem, url } = useContext(StoreContext);

  // State for form data
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  // Function to handle changes in form input
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  // Function to place order
  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];

    // Construct order items array
    foodlist.forEach((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });

    // Construct order data
    let orderData = {
      address: data,
      items: orderItems,
      amount: totalCartAmount() + 2,
    };

    // Send order request
    let response = await axios.post(url + '/api/order/place', orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  }

  // UseNavigate hook for navigation
  const navigate = useNavigate();

  // Check if user is logged in or if cart is empty
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    
    } else if (totalCartAmount === 0) {
      navigate('/cart');
      alert("Please add at least one product to the cart!");
    }
  }, [token]);

  // Render the PlaceOrder component
  return (
    <form className='px-[80px] w-full flex justify-between flex-wrap  mt-[60px] ' onSubmit={placeOrder}>
      <div className='w-full max-w-[500px] flex flex-col gap-3'>
        <p className='text-[30px] font-bold mb-[40px]'>Delivery Information</p>
        <div className='flex gap-3'>
          <input required className='w-full p-[10px] rounded border-[1px] border-[#c5c5c5]' name='firstname' onChange={onChangeHandler} value={data.firstname} type='text' placeholder='First Name'></input>
          <input required className='w-full p-[10px] rounded border-[1px] border-[#c5c5c5]' name='lastname' onChange={onChangeHandler} value={data.lastname} type='text' placeholder='Last Name'></input>
        </div>
        <input required className='w-full p-[10px] rounded border-[1px] border-[#c5c5c5]' name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your Email'></input>
        <input required className='w-full p-[10px] rounded border-[1px] border-[#c5c5c5]' name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street'></input>
        <div className='flex gap-3'>
          <input required className='w-full p-[10px] rounded border-[1px] border-[#c5c5c5]' name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City'></input>
          <input required className='w-full p-[10px] rounded border-[1px] border-[#c5c5c5]' name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State'></input>
        </div>
        <div className='flex gap-3'>
          <input required className='w-full p-[10px] rounded border-[1px] border-[#c5c5c5]' name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip Code'></input>
          <input required className='w-full p-[10px] rounded border-[1px] border-[#c5c5c5]' name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country'></input>
        </div>
        <input required className='w-full p-[10px] rounded border-[1px] border-[#c5c5c5]' name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone'></input>
      </div>
      <div className='w-full max-w-[500px] mt-[100px]'>
        <div className='flex flex-col gap-6'>
          <h2>Cart Totals</h2>
          <div className='flex flex-col gap-6'>
            <div className='flex justify-between '>
              <p>Sub Total</p>
              <p>${totalCartAmount()}</p>
            </div>
            <hr />
            <div className='flex justify-between '>
              <p>Delivery Fee</p>
              <p>${totalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className='flex justify-between '>
              <p>Total</p>
              <p>${totalCartAmount() === 0 ? 0 : totalCartAmount() + 2}</p>
            </div>
            <hr />
          </div>
          <button type='submit' className='mt-[30px] bg-[#8d2c2cdc] text-white p-3'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}


export default PlaceOrder;