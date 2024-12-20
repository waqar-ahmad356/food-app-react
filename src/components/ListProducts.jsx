import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../Context/StoreContextProvider";
import { assets } from "../assets/assets";

const ListProduct = () => {
  const { url } = useContext(StoreContext);
  const token = localStorage.getItem("token");
  const [list, setList] = useState([]);
  const [visiblePopupId, setVisiblePopupId] = useState(null); // State to track visible pop-up

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/lists`, {
        headers: { token, "ngrok-skip-browser-warning": "true" },
      });
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

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(
        `${url}/api/food/remove`,
        { id: foodId },
        { headers: { token, "ngrok-skip-browser-warning": "true" } }
      );
      await fetchList();
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

  const handleDelete = (foodId) => {
    setVisiblePopupId(null); // Close the pop-up
    removeFood(foodId); // Execute the delete action
  };

  return (
    <div className="lg:px-[80px] md:px-[60px] sm:px-[40px] px-[16px] flex flex-col gap-3">
      <p className="text-[30px] text-[tomato]">All Food List</p>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-4">
          <b className="text-[14] text-[#ec4236]">Image</b>
          <b className="text-[14] text-[#ec4236]">Name</b>
          <b className="text-[14] text-[#ec4236]">Price</b>
          <b className="text-[14] text-[#ec4236]">Action</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className="grid grid-cols-4 gap-4">
            <img className="w-[150px]" src={assets.food1} alt="food" />
            <p>{item.name}</p>
            <p>${item.price}</p>

            <div className="relative">
              <p
                className="cursor-pointer text-[red] text-[20px]"
                onClick={() => setVisiblePopupId(item._id)}
              >
                X
              </p>
              {visiblePopupId === item._id && (
                <div className="absolute left-[20px] top-[30px] w-[150px] bg-[tomato] text-white text-center py-[10px] rounded-[6px] z-20 shadow-md">
                  <p>Are you sure?</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <button
                      className="bg-white text-[tomato] py-1 px-3 rounded-[4px] cursor-pointer"
                      onClick={() => handleDelete(item._id)}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-white text-[tomato] py-1 px-3 rounded-[4px] cursor-pointer"
                      onClick={() => setVisiblePopupId(null)}
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
