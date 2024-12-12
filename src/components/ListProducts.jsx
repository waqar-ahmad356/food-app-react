import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios'; 
import { toast } from 'react-toastify'; 
import { StoreContext } from '../Context/StoreContextProvider';

const ListProduct = () => {
  const {url,token}=useContext(StoreContext)
  const[list , setList]=useState([])


 
  const fetchList = async () => {
  
    try {
      const response = await axios.get(`${url}/api/food/lists`,{headers:{token}});
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
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId },{headers:{token}});
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
    <div className='px-[80px] flex flex-col gap-3'>
      <p>All Food List</p>
      <div className='flex flex-col gap-5'>
       
        <div className='grid grid-cols-5'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
       
        {list.map((item, index) => {
          return (
            <div key={index} className='grid grid-cols-5 gap-4'>
             
              <img className='w-[150px]' src={`${url}/images/${item.image}`} alt='pic' />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
             
              <p className='cursor-pointer' onClick={() => removeFood(item._id)}>X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;