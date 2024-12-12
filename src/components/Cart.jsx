import React, { useContext } from 'react';

import { StoreContext } from '../Context/StoreContextProvider';
import { assets } from "../assets/assets"
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  // Accessing context for cart items, food list, removal function, total amount, and image URL
  const { cartItem, foodlist, removeFromCart, totalCartAmount, url } = useContext(StoreContext);
  // Navigation hook for redirecting to other pages
  const navigate = useNavigate();

  return (
    <div className='mt-[100px] mb-[50px] px-[80px]'>
      <div className='cart-items'>
        {/* Displaying cart items with details */}
        <div className='grid md:grid-cols-6 grid-cols-3'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr className='mt-[10px] mb-[10px]' />
        {/* Mapping through each food item in the cart */}
        {foodlist.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <div  key={index}>
                {/* Displaying each cart item */}
                <div className=' grid grid-cols-3 md:grid-cols-6 '>
                  {/* <img src={url + "/images/" + item.image} className='w-[50px]' alt='item'/>*/}

                  <img src={assets.food1} alt='food'/> 
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${item.price * cartItem[item._id]}</p>
                  {/* Button to remove item from cart */}
                  <p className='cursor-pointer' onClick={() => removeFromCart(item._id)}>X</p>
                </div>
                <hr className='mt-[10px] mb-[10px]' />
              </div>
            )
          }
        })}
      </div>
      {/* Displaying cart total and proceed to checkout */}
      <div className='mt-[80px] max-w-[500px]'>
        <div className='flex gap-4 flex-col w-full'>
          <h2 className='font-bold text-center text-[20px]'>Cart Totals</h2>
          <div className='flex flex-col gap-2 w-full'>
            {/* Displaying subtotal, delivery fee, and total amount */}
            <div className='flex justify-between w-full '>
              <p>Sub Total</p>
              <p>${totalCartAmount()}</p>
            </div>
            <hr />
            <div className='flex justify-between w-full '>
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
          {/* Button to proceed to checkout or prompt to select products */}
          {totalCartAmount() === 0 ? <button onClick={() => navigate('/')} className='border-0 text-white bg-[#a11f1f] px-4 py-3'>PLEASE SELECT PRODUCT</button> :
            <button className='border-0 text-white bg-[#a11f1f]  px-4 py-3' onClick={() => navigate('/place-order')}>PROCEED TO CHECKOUT</button>}
        </div>
        
        
      </div>
    </div>
  );
}

export default Cart;