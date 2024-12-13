import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import logo_user from "../assets/logo-user.png";
import { assets } from "../assets/assets";
import { StoreContext } from "../Context/StoreContextProvider";


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { totalCartAmount } = useContext(StoreContext);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("name"); // Assuming user's name is stored in localStorage

  useEffect(() => {
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
 
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="px-[16px] sm:px-[40px] md:px-[60px] lg:px-[80px] py-[16px] bg-white">
      <div className="flex items-center justify-between flex-wrap">
        {/* Logo */}
        {userRole === "buyer" ? (
          <Link to="/"><img src={logo_user} className="cursor-pointer" alt="logo" /></Link> 
        ) : userRole === "admin" ? (
          <img src={logo} className="max-w-full h-auto" alt="logo" />
        ) : (
          <img src={logo_user} alt="logo" />
        )}

        {/* Navigation Links */}
        <ul className="flex items-center list-none gap-4">
          {!isLoggedIn ? (
            <li>
              <Link
                to="/login"
                className="px-6 py-3 font-semibold text-[18px] rounded-3xl bg-[tomato] border border-[tomato] hover:bg-white hover:text-[tomato] text-white"
              >
                Login
              </Link>
            </li>
          ) : (
            <>
              {/* Conditional rendering based on userRole */}
              {userRole === "buyer" && (
                <>
                  <li>
                    <Link
                      to="/myorders"
                      className="font-semibold sm:text-[18px] text-[12px] text-[#ec4236]"
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <div className="relative">
                      <Link to="/cart">
                        <img src={assets.basket_icon} alt="Cart" />
                      </Link>
                      {totalCartAmount() !== 0 && (
                        <div className="absolute min-w-[10px] min-h-[10px] bg-[#e02424] rounded-[5px] top-[-7px] right-[-7px]" />
                      )}
                    </div>
                  </li>
                </>
              )}
              {userRole === "admin" && (
                <>
                  <li>
                    <Link
                      to="/create-product"
                      className="font-semibold sm:text-[18px] text-[12px] text-[#ec4236]"
                    >
                      Create Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/list-products"
                      className="font-semibold sm:text-[18px] text-[12px] text-[#ec4236]"
                    >
                      List of Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/order-list"
                      className="font-semibold sm:text-[18px] text-[12px] text-[#ec4236]"
                    >
                      Orders
                    </Link>
                  </li>
                </>
              )}
              {/* Profile Dropdown */}
              <li className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <img
                    src={assets.profile_icon}
                    alt="User"
                    className="w-[30px] h-[30px] object-contain rounded-full"
                  />
                  <span className="font-semibold uppercase text-[#ec1109ef]">{username}</span>
                </div>
                {isDropdownVisible && (
                  <div className="absolute right-0 mt-1 w-40 bg-white text-black rounded shadow-lg z-20">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-[tomato]"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
