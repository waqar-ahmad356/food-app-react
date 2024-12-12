import React, {
  useContext,

  useEffect,
  useState,
 
} from "react";

import { StoreContext } from "../Context/StoreContextProvider";

import axios from "axios";

import { assets } from "../assets/assets";

const MyOrders = () => {
  // Define state variables using the useState hook
  const [data, setData] = useState([]);
const token=localStorage.getItem("token")
  // Destructure the url and token from the StoreContext
  const { url } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/user-orders",
        {},
        {
          headers: { token,'ngrok-skip-browser-warning': 'true' },
        }
      );

      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="mt-[60px] px-[80px]">
      <h2 className="font-bold text-[30px]">My Orders</h2>
      <div className="flex flex-col gap-4 mt-[30px]">
        {data.map((order, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr] gap-7 text-[#454545] items-center border px-[20px] py-[10px] border-[tomato]"
            >
              <img className="w-[50px]" src={assets.parcel_icon} alt="icon" />

              <p className="text-[#454545] font-normal">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " " + item.quantity;
                  } else {
                    return item.name + " " + item.quantity + ", ";
                  }
                })}
              </p>

              <p className="text-[#454545] font-normal">${order.amount}.00</p>

              <p className="text-[#454545] font-normal">
                Items: {order.items.length}
              </p>

              <p className="text-[#454545] font-normal">
                <span className="text-[tomato]">&#x25cf;</span>{" "}
                <b>{order.status}</b>
              </p>

              <button
                className="border-0 py-[12px]  rounded-[4px] bg-[#ffe1e1] cursor-pointer text-[#454545]"
                onClick={fetchOrders}
              >
                Track Order
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
