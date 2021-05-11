import React, { createContext } from "react";

export const AppContext = createContext();

export const StateManagement = ({ children }) => {
  return (
    <AppContext.Provider value={{ store: "I am Bless" }}>
      {children}
    </AppContext.Provider>
  );
};
