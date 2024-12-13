import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';

export const StoreContext=createContext(null);

const StoreContextProvider = ({children}) => {
    const [foodlist,setFoodList]=useState([]) //state for food list
    const [token,setToken]=useState(false) //state fro authentication token

    const [cartItem,setCartItem]=useState(()=>{    //state for cart items
        const storedCart=localStorage.getItem("cart");
        return storedCart?JSON.parse(storedCart):{}
    })
    const url="https://b9fe-203-99-174-147.ngrok-free.app";
   


   
    useEffect(() => {
      try {
          localStorage.setItem("cart", JSON.stringify(cartItem));
      } catch (error) {
          console.error("Error saving cart to localStorage:", error);
      }
  }, [cartItem]);
  
    //function to add item in the cart
    const addToCart = async (itemId) => {
      if (!cartItem[itemId]) {
          setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
          setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }
  
      // Ensure the token is present before making API calls
      if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.id;
          // console.log("userId", userId);
  
          try {
              const response = await axios.post(
                  url + "/api/cart/add",
                  { userId, itemId },
                  { headers: { token, 'ngrok-skip-browser-warning': 'true' } }
              );
              console.log("Cart update response:", response.data);
          } catch (error) {
              console.log("Error updating cart:", error);
          }
      }
  };

  
    
    //function to remove item from the cart
    const removeFromCart = async (itemId) => {
      if (!cartItem[itemId]) {
        console.error(`Item with ID ${itemId} is not in the cart.`);
        return; // Prevent further execution
      }
    
      // Decrement the quantity if it's more than 1, or remove the item if quantity is 1
      if (cartItem[itemId] > 1) {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      } else {
        // Remove the item completely if the quantity is 1
        const newCart = { ...cartItem };
        delete newCart[itemId];
        setCartItem(newCart);
      }
    
      // Send request to the server if the user is authenticated
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id; 
        // console.log("userId", userId);
    
        try {
          // Send the itemId and userId to the server for cart update
          await axios.post(
            `${url}/api/cart/remove`,
            { itemId, userId }, // Pass userId along with itemId
            { headers: { token, 'ngrok-skip-browser-warning': 'true' } }
          );
          console.log("Item removed from cart");
        } catch (error) {
          console.error("Error removing item from cart on server:", error);
        }
      }
    };
    
    
    //get the total cart amount
    const totalCartAmount = () => {
      let totalAmount = 0;
    
      // Loop through each item in the cart
      for (const itemId in cartItem) {
        if (cartItem[itemId] > 0) {
          // Ensure both itemId and product._id are compared as strings or both as numbers
          const itemInfo = foodlist.find((product) => String(product._id) === String(itemId));
    
          // console.log(itemInfo); // Check the itemInfo to see if it's undefined or not
    
          if (itemInfo) {
            // If itemInfo exists, calculate total price
            totalAmount += itemInfo.price * cartItem[itemId];
          } 
          // else {
          // //   // Log an error if the item is not found in foodlist
          // //   console.error(`Item with ID ${itemId} not found in food list.`);
          // // }
        }
      }
    
      // console.log('Total Amount:', totalAmount); // Log the totalAmount to ensure it's being calculated
      return totalAmount;
    };
    
    //functionto load cart data from the server
    const loadCartData=async()=>{
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        // console.log("userId", userId);
        const response=await axios.get(url+"/api/cart/get",{userId},{headers:{token, 'ngrok-skip-browser-warning': 'true'}})
        setCartItem(response.data.cartData)
    }
  }
    const fetchFoodData = async () => {
      try {
        
        
        
    
        const response = await axios.get(`${url}/api/food/list`,{headers:{ 'ngrok-skip-browser-warning': 'true',}})
        
    
        if (response.data && response.data.data) {
          setFoodList(response.data.data);
        } else {
          console.error("No data received from food list API");
        }
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };
    
    // Effect to fetch list data and load cart data when component mounts
    useEffect(()=>{
      const loadData=async()=>{
        await fetchFoodData();
        const storedToken=localStorage.getItem("token");
        if(storedToken){
          setToken(storedToken)
          await loadCartData(storedToken)
        }
      }
      loadData();
    },[])
     // Function to clear cart and token when user logs out
     const logout = () => {
      // Clear cart and token from localStorage and reset state
      localStorage.removeItem("cart");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setCartItem({});
      setToken("");
  };

  const  contextValue={ foodlist,
      cartItem,
      setCartItem,
      addToCart,
      removeFromCart,
      totalCartAmount,
      url,
      setToken,
      token,
      logout }
  return (
    <StoreContext.Provider value={contextValue}>
    {children}
      
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
