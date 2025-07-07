// context/ChatContext.jsx
import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversationId, setConversationId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  return (
    <ChatContext.Provider value={{ conversationId, setConversationId, token }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
