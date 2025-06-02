import { createContext, useEffect, useState } from "react";
import { food_list,menu_list } from "../assets/assets";
import { API_ENDPOINTS } from "../config/api";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    const [ordersData,setOrdersData] = useState({});
    const [foodList, setFoodList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch food data from API
    const fetchFoodData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_ENDPOINTS.ARTICLES);
            if (response.data.status === 'success') {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching food data:', error);
            // Fallback to static data if API fails
            setFoodList(food_list);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoodData();
    }, []);

    const addToCart = (itemId) =>{
        if(!cartItems[itemId])
        {
            setCartItems((prev)=>({...prev,[itemId]:1}));
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        }
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const clearCart = () => {
        setCartItems({});
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            // Use dynamic foodList from API, fallback to static food_list
            const currentFoodList = foodList.length > 0 ? foodList : food_list;
            let itemInfo = currentFoodList.find((product) =>
              (product.id === Number(item)) || (product.food_id === Number(item))
            );
            if (itemInfo) {
              const price = itemInfo.price || itemInfo.food_price || 0;
              totalAmount += price * cartItems[item];
            }
          }
        }
        return totalAmount;
      }

    const placeOrder = (deliveryData) =>{

        console.log(deliveryData);
    }

    const contextValue = {
        food_list,
        menu_list,
        foodList,
        loading,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalCartAmount,
        placeOrder,
        fetchFoodData
    };

    return (
        <StoreContext.Provider value={contextValue}> {props.children} </StoreContext.Provider>
        )

}

export default StoreContextProvider;