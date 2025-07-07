// hooks/useChatSocket.js
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export const useChatSocket = (conversationId, token) => {
  const [messages, setMessages] = useState([]);
  const stompClientRef = useRef(null);

  useEffect(() => {
    if (!conversationId || !token) return;

    const socket = new SockJS(`http://localhost:8080/ws?token=${token}`);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect({}, () => {
      stompClient.subscribe(`/user/queue/conversation/${conversationId}`, (msg) => {
        const data = JSON.parse(msg.body);
        setMessages((prev) => [...prev, data]);
      });
    });

    return () => {
      stompClient.disconnect();
    };
  }, [conversationId, token]);

  const sendMessage = (message) => {
    if (!message || !stompClientRef.current?.connected) return;
    stompClientRef.current.send('/app/send-message', {}, JSON.stringify(message));
  };

  return { messages, sendMessage };
};
