// contexts/GlobalContext.js
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface GlobalProviderProps {
  children: ReactNode; // Type the children prop
}

const GlobalContext = createContext({
  globalTheme: "", // Default value for globalVar
  setGlobalTheme: () => {}, // Default is a no-op function
});

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [globalTheme, setGlobalTheme] = useState("purple");

  return (
    <GlobalContext.Provider value={{ globalTheme, setGlobalTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
