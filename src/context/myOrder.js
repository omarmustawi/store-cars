"use client";
import { createContext, useContext, useState } from "react";

export const MyOrderContext = createContext();

export const MyOrderProvider = ({ children }) => {
  const [myOrders, setMyOrders] = useState([]);

  const removeOrder = (orderId) => {
    setMyOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  return (
    <MyOrderContext.Provider
      value={{
        myOrders,
        setMyOrders,
        removeOrder
      }}
    >
      {children}
    </MyOrderContext.Provider>
  );
};

export function useMyOrders() {
  return useContext(MyOrderContext);
}
