import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './components/Login'
import Navbar from './components/Navbar'
import ProtectedRoutes from './components/ProtectedRoutes'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import FoodDisplay from './components/FoodDisplay'
import Cart from './components/Cart'
import CreateProduct from './components/CreateProduct'
import ListProduct from './components/ListProducts'
import PlaceOrder from './components/PlaceOrder'
import MyOrders from './components/MyOrders'
import Verify from './components/Verify'
import Orders from './components/Orders'
import Page404 from './components/404Page'


const App = () => {
  return (
   <>
   <Navbar/>
  
   <ToastContainer/>
   <Routes>
     
     <Route path='/' element={<FoodDisplay/>}/>
     <Route path="/create-product" element={<ProtectedRoutes requiredRole="admin"><CreateProduct/></ProtectedRoutes>}/>
     <Route path="/list-products" element={<ProtectedRoutes requiredRole="admin"><ListProduct/></ProtectedRoutes>}/>
     <Route path='/order-list' element={<ProtectedRoutes requiredRole="admin"><Orders/></ProtectedRoutes>}/>
     <Route path='/cart' element={<ProtectedRoutes requiredRole="buyer"><Cart/></ProtectedRoutes>}/>
     <Route path='/place-order' element={<ProtectedRoutes requiredRole="buyer"><PlaceOrder/></ProtectedRoutes>}/>
     <Route path='/verify' element={<ProtectedRoutes requiredRole="buyer"><Verify/></ProtectedRoutes>} />
     <Route path='/myorders' element={<ProtectedRoutes requiredRole="buyer"><MyOrders/></ProtectedRoutes>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='*' element={<Page404/>}/>
     
    </Routes> 
   </>
  )
}

export default App
