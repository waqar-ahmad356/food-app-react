import React, { useContext, useState } from 'react';
import {StoreContext} from '../Context/StoreContextProvider'
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateProduct = () => {
   
    const [image, setImage] = useState(null); // State to store the selected image file
    const [data, setData] = useState({ // State to store form data
        name: "",
        description: "",
        price: "",
        category: "Salad" // Default category
    });
    const {url}=useContext(StoreContext);
    const token=localStorage.getItem("token")

    // Function to handle changes in input fields
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    // Function to handle form submission
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image); // Appending the selected image file to the form data

        
        try {
            const response = await axios.post(`${url}/api/food/add`, formData,{headers:{token,'ngrok-skip-browser-warning': 'true'}});
            if (response.data.success) {
                
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setImage(null);
                // Showing a success toast notification
                toast.success(response.data.message);
            } else {
                toast.error("Error")
                // Handling error response if needed
            }
        } catch (error) {
            toast.error(error)
            console.error("Error:", error);
            
        }
    }

    return (
        <div className='lg:px-[80px] md:px-[60px] sm:px-[40px] px-[16px] mt-[40px] md:w-[50%] w-[100%]  pb-8'>
           
            <form className='flex flex-col gap-3' onSubmit={onSubmitHandler}>
           
                <div className='flex flex-col gap-1'>
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                      
                        <img className='w-[150px]' src={image ? URL.createObjectURL(image) : assets.upload_area} alt='' />
                    </label>
                  
                    <input className='w-[150px]' onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
                </div>
              
                <div className='flex flex-col gap-1'>
                    <p>Product Name</p>
                    <input className='bg-[#dad4d3] px-3 py-2 rounded-xl' onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='type here' />
                </div>
                
                <div className='flex flex-col gap-1'>
                    <p>Product description</p>
                    <textarea className='bg-[#dad4d3] px-3 py-2 rounded-xl resize-none' onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='write content here'></textarea>
                </div>
           
                <div className='add-product-category-price'>
                 
                    <div className='flex flex-col gap-1'>
                        <p>Product Category</p>
                        <select className='bg-[#dad4d3] px-3 py-2 rounded-xl' onChange={onChangeHandler} name='category'>
                           
                            <option>Salad</option>
                            <option>Rolls</option>
                            <option>Deserts</option>
                            <option>Sandwich</option>
                            <option>Cake</option>
                            <option>Pure Veg</option>
                            <option>Pasta</option>
                            <option>Noodles</option>
                        </select>
                    </div>
                    {/* Input field for product price */}
                    <div className='flex flex-col gap-1'>
                        <p>Product Price</p>
                        <input className='bg-[#dad4d3] px-3 py-2 rounded-xl' onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='$20' />
                    </div>
                </div>
             
                <button type='submit' className='bg-[tomato] w-[140px] px-4 py-3 text-white'>ADD</button>
            </form>
        </div>
    );
}

export default CreateProduct;