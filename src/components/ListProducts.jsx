import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios'; 
import { toast } from 'react-toastify'; 
import { StoreContext } from '../Context/StoreContextProvider';

import { assets } from '../assets/assets';

const ListProduct = () => {
  const {url}=useContext(StoreContext)
  const token=localStorage.getItem("token");
  const[list , setList]=useState([])
  const [tooltipVisible, setTooltipVisible] = useState(false);


 
  const fetchList = async () => {
  
    try {
      const response = await axios.get(`${url}/api/food/lists`,{headers:{token,'ngrok-skip-browser-warning': 'true'}});
      if (response.data.success) {
        setList(response.data.data); 
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error:", error); 
      toast.error("Error fetching data"); 
    }
  };

  // useEffect hook to fetch the list of food items when the component mounts
  useEffect(() => {
    fetchList();
  }, []);

  // Function to remove a food item
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId },{headers:{token,'ngrok-skip-browser-warning': 'true'}});
      await fetchList(); // Refreshing the list after removal
      if (response.data.success) {
        toast.success("Product Removed Successfully");
      } else {
        toast.error("Error removing product"); 
      }
    } catch (error) {
      console.error("Error:", error); 
      toast.error("Error removing product"); 
    }
  };

  return (
    <div className='lg:px-[80px] md:px-[60px] sm:px-[40px] px-[16px] flex flex-col gap-3'>
      <p className='text-[30px] text-[tomato]'>All Food List</p>
      <div className='flex flex-col gap-5'>
       
        <div className='grid grid-cols-4'>
          <b className='text-[14] text-[#ec4236]'>Image</b>
          <b className='text-[14] text-[#ec4236]'>Name</b>
          {/* <b>Category</b> */}
          <b className='text-[14] text-[#ec4236]'>Price</b>
          <b className='text-[14] text-[#ec4236]'>Action</b>
        </div>
       
        {list.map((item, index) => {
          return (
            <div key={index} className='grid grid-cols-4 gap-4'>
             
             {/* <img className='w-[150px]' src={`${url}/images/${item.image}`} alt='pic' /> */}
             <img className='w-[150px]'  src={assets.food1} alt='food'/> 
              <p>{item.name}</p>
              {/* <p>{item.category}</p> */}
              <p>${item.price}</p>
             
              <p
        className="cursor-pointer text-[red] relative text-[20px] group"
        onClick={() => removeFood(item._id)}
      >
        X
        <span className="absolute left-[20px] text-[12px] invisible w-[120px] bg-[tomato] text-white text-center py-[5px] rounded-[6px] group-hover:visible z-10">
          Delete the product
        </span>
      </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;