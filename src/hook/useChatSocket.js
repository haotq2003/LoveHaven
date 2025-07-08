import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export const useChatSocket = (conversationId, token) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef(null);

  useEffect(() => {
    if (!conversationId || !token) return;

    const jwtToken = typeof token === 'string' ? token : token?.token;
    if (!jwtToken || !jwtToken.includes('.')) {
      console.warn('⚠️ Token không hợp lệ:', jwtToken);
      return;
    }

    console.log('🔐 WebSocket Token:', jwtToken);
    console.log('🔌 Kết nối WebSocket với conversationId:', conversationId);

    const socket = new SockJS(`http://localhost:8080/ws?token=${jwtToken}`);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect({}, () => {
      console.log('✅ STOMP connected');
      setIsConnected(true);

      stompClient.subscribe(`/user/queue/conversation/${conversationId}`, (msg) => {
        const data = JSON.parse(msg.body);
        console.log('📩 Tin nhắn mới:', data);
        setMessages((prev) => [...prev, data]);
      });
    }, (error) => {
      console.error('❌ STOMP connection error:', error);
      setIsConnected(false);
    });

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect(() => {
          console.log('🛑 STOMP disconnected');
        });
      }
    };
  }, [conversationId, token]);

  const sendMessage = (message) => {
    if (!isConnected || !message?.message?.trim()) {
      console.warn('⚠️ Không gửi được tin nhắn: chưa kết nối hoặc nội dung rỗng');
      return;
    }

    const payload = {
      conversationId: message.conversationId,
      message: message.message // ✅ Đúng field DTO backend yêu cầu
    };

    console.log('📤 Gửi tin nhắn:', payload);
    stompClientRef.current.send('/app/send-message', {}, JSON.stringify(payload));
  };

  return { messages, sendMessage };
};
