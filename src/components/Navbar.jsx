
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

 import logo_user from '../assets/logo-user.png'
 import { assets } from "../assets/assets";
import { StoreContext } from "../Context/StoreContextProvider";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const {totalCartAmount}=useContext(StoreContext);
 

  // Check localStorage for token and role on component mount
  const token = localStorage.getItem("token");
    const role=localStorage.getItem("role")
    
    
    
   useEffect(()=>{
    
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
 
   },[token])

  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="px-[16px] sm:px-[40px] md:px-[60] lg:px-[80px] py-[16px] bg-white">
      <div className="flex items-center justify-between flex-wrap">
      {
        userRole==="buyer"?<img src={logo_user} alt="logo"/> :userRole==="admin"?<img src={logo} className="max-w-full h-auto" alt="logo" />:<img src={logo_user} alt="logo"/>
      }
      
        

        <ul className="flex items-center list-none gap-4">
          {!isLoggedIn ? (
            <li>
              <Link to="/login" className="px-6 py-3 font-semibold text-[18px] rounded-3xl bg-[#c4582d] border border-[#c4582d] hover:bg-white hover:text-[#c4582d] text-white">Login</Link>
            </li>
          ) : (
            <>
              {/* Conditional rendering of navigation links based on userRole */}
              {userRole === "buyer" && (
               <>
              <li>
                <Link to="/myorders" className="font-semibold sm:text-[18px] text-[12px]  text-[#c4582d]">My Orders</Link>
              </li>
                <li>
                <div className='relative'> {/* Container for basket icon */}
          <Link to='/cart'> {/* Link to cart page */}
            <img src={assets.basket_icon} alt=''></img> {/* Basket icon */}
          </Link>
          <div className={totalCartAmount() === 0 ? "" : "absolute min-w-[10px] min-h-[10px] bg-[#e02424] rounded-[5px] top-[-7px] right-[-7px]"}></div> {/* Dot indicator for items in the cart */}
        </div>
                  
                </li>
                </>
              )}
              {userRole === "admin" && (
                <>
                  
                  <li>
                    <Link to="/create-product" className="font-semibold sm:text-[18px] text-[12px]  text-[#c4582d]">Create Product</Link>
                  </li>
                  <li>
                    <Link to="/list-products" className="font-semibold sm:text-[18px] text-[12px] text-[#c4582d]">List of Products</Link>
                  </li>
                  <li>
                    <Link to="/order-list" className="font-semibold sm:text-[18px] text-[12px] text-[#c4582d]">Orders</Link>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 font-semibold text-[18px] rounded-3xl bg-[#c4582d] border border-[#c4582d] hover:bg-white hover:text-[#c4582d] text-white"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
