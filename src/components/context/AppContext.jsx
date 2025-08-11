/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [counter, setCounter] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // Start a countdown
  const startCounter = (seconds = 60) => {
    setCounter(seconds);
  };

  // Countdown effect
  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setInterval(() => {
        setCounter((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <AppContext.Provider
      value={{
        email,
        setEmail,
        counter,
        setCounter,
        modalVisible,
        setModalVisible,
        startCounter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
};
