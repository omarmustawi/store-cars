"use client";
import { createContext, useContext, useState } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // const filterSearch = (searchWord, filterType) => {
  //   switch (filterType) {
  //     case "all":
  //       return;
  //     case "rate":
  //       console.log(products.filter((product) => product.rate === searchWord));
  //       return products.filter((product) => product.rate === searchWord);
  //     case "title":
  //       console.log(
  //         products.filter((product) =>
  //           product.title.toLowerCase().includes(searchWord.toLowerCase())
  //         )
  //       );
  //       return products.filter((product) =>
  //         product.title.toLowerCase().includes(searchWord.toLowerCase())
  //       );
  //     default:
  //       return products;
  //   }
  // };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export function useProducts() {
  return useContext(ProductsContext);
}
