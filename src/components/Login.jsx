import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";


import { StoreContext } from "../Context/StoreContextProvider";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); 
  const [message, setMessage] = useState(""); // Message state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
 
  });
  const navigate = useNavigate();
  const {url}=useContext(StoreContext)

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newurl = isLogin
        ? `${url}/api/user/login` // Login API
        : `${url}/api/user/register`; // Sign Up API

      const payload = isLogin
        ? { email: formData.email, password: formData.password } // Login payload
        : formData; // Sign Up payload

      const { data } = await axios.post(newurl, payload,
       
        
      );

      // Set success message from backend
      toast.success(data.message || (isLogin ? "Login Successful" : "Sign Up Successful"));
     
      
      if (isLogin && data.token) {
        const token = localStorage.setItem("token", data.token);
        const decodedToken = jwtDecode(data.token);
        localStorage.setItem("role", decodedToken.role);

        if (decodedToken.role === "buyer" || decodedToken.role === "admin") {
          navigate("/");
        }
      }

      // Reset form fields after successful submission
      setFormData({
        name: "",
        email: "",
        password: "",
       
      });
     

    } catch (error) {
      // Set error message from backend
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        
        {/* Display success or error message */}
        {/* {message && (
          <div className={`mb-4 text-center ${message.includes("Successful") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </div>
        )} */}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Username
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your username"
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          {/* {!isLogin && (
            <div className="mb-6">
              <label htmlFor="role" className="block text-gray-700 font-medium">
                Select Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="" disabled>
                  Choose your role
                </option>
                <option value="admin">Admin</option>
                <option value="buyer">Buyer</option>
              </select>
            </div>
          )} */}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            onClick={toggleForm}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;