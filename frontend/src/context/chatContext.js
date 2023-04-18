import React, { createContext, useState, useEffect } from "react";
import client from "../../config/config.js"

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // const [userInfo, setUserInfo] = useState({});
  const [userData, setUserData] = useState([]);

  const userId = "81becdd2-e618-4282-8be1-ff7823964c79";
  const accountType = "moniteur";
//  const userId = "dc1c1d66-8bee-449b-ac12-b370156d73fb";
//   const accountType = "condidat";



  return (
    <ChatContext.Provider
      value={{
        userId,
        accountType,
        userData, 
        setUserData
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
