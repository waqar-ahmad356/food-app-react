import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContextProvider'
import FoodItems from './FoodItems'

const FoodDisplay = () => {

    const {foodlist}=useContext(StoreContext)
  return (
    <div>
    <div className='lg:px-[80px]'>
        <h2 className='font-bold text-[tomato] text-[30px]'>Delicious Food</h2>
        <div className='grid grid-cols-3 gap-6 mt-8'>
            {foodlist.map((item,index)=>{
                return(
                        <FoodItems key={index} id={item._id} name={item.name}
                        description={item.description} price={item.price} image={item.image}/>
                )
            })}
        </div>
    </div>
      
    </div>
  )
}

export default FoodDisplay
