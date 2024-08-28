// LoadingContext.js
import React, { createContext, useState, useContext } from "react";
 
const LoadingContext = createContext();
 
export const useLoading = () => useContext(LoadingContext);
 
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
 
  const value = { isLoading, setIsLoading, };
 
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};