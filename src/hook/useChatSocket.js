import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 < Date.now();
  } catch (e) {
    console.error('❌ Token invalid:', e);
    return true;
  }
};

export const useChatSocket = (conversationId, token) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    if (!conversationId || !token) return;

    const jwtToken = typeof token === 'string' ? token : token?.token;
    if (!jwtToken || !jwtToken.includes('.') || isTokenExpired(jwtToken)) {
      console.warn('⚠️ Token không hợp lệ hoặc đã hết hạn');
      return;
    }

    const socket = new SockJS(`https://summer2025-exe-be.onrender.com/ws?token=${jwtToken}`);
    const stompClient = Stomp.over(socket);
    stompClient.debug = () => {};
    stompClientRef.current = stompClient;

    stompClient.connect(
      {},
      () => {
        setIsConnected(true);
        console.log('✅ STOMP connected');

        if (subscriptionRef.current) subscriptionRef.current.unsubscribe();

        subscriptionRef.current = stompClient.subscribe(
          `/user/queue/conversation/${conversationId}`,
          (msg) => {
            const data = JSON.parse(msg.body);
            setMessages((prev) => [...prev, data]);
          }
        );
      },
      (error) => {
        setIsConnected(false);
        console.error('❌ STOMP connect error:', error);
      }
    );

    return () => {
      if (subscriptionRef.current) subscriptionRef.current.unsubscribe();
      if (stompClientRef.current?.connected) {
        stompClientRef.current.disconnect(() => {
          console.log('🛑 STOMP disconnected');
        });
      }
    };
  }, [conversationId, token]);

  const sendMessage = (message) => {
    if (!isConnected || !message?.content?.trim()) {
      console.warn('⚠️ Không gửi được tin nhắn: chưa kết nối hoặc nội dung rỗng');
      return;
    }

    const payload = {
      conversationId: message.conversationId,
      message: message.content,
    };

    stompClientRef.current.send('/app/send-message', {}, JSON.stringify(payload));
  };

  return { messages, sendMessage, isConnected };
};
