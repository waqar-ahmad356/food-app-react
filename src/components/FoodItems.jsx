import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContextProvider'
import {assets} from '../assets/assets'

const FoodItems = ({id,name,description,price,image}) => {

  const {addToCart,cartItem,removeFromCart,url}=useContext(StoreContext)
  return (
    <div className='w-full m-auto rounded-[15px] shadow-xl'> 
   
            <div className='relative  '> 
               {/* <img className=' rounded-t-[15px] rounded-b-none rounded-r-[15px] w-full' src={url + "/images/" + image} alt='food'></img> */}
               <img src={assets.food1} className=' rounded-t-[15px] rounded-b-none rounded-r-[15px] w-full' alt='food'/>{/* Image for food item */}
              
                {!cartItem[id] ? (
                    <img className='w-[35px] absolute bottom-[15px] right-[15px] rounded-[50px] cursor-pointer ' src={assets.add_icon_white} onClick={() => addToCart(id)}></img> 
                ) : (
                    <div className=' absolute bottom-[15px] right-[15px] flex items-center gap-[10px] p-[6px] rounded-[50px] bg-white cursor-pointer '> 
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='icon'></img> 
                        <p>{cartItem[id]}</p> 
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt='icon'></img> 
                    </div>
                )}
            </div>
            <div className='p-[20px] flex flex-col gap-3'> 
                <div className='flex flex-col gap-2' > 
                    <p className='text-[20px] font-semibold text-[#ec4236]'>{name}</p> 
                    <div>
                    <img src={assets.rating_stars} alt='rating'/>
                    </div>
                </div>
                <p className='text-[14px] font-medium'>{description}</p> 
                <p className='font-bold'>${price}</p> 
           
            </div>
        </div>
  )
}

export default FoodItems
