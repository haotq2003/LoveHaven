import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export const useChatSocket = (conversationId, token) => {
  const [messages, setMessages] = useState([]);
  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);
  const currentConvIdRef = useRef(null); // 🧠 dùng để tránh sub trùng

  useEffect(() => {
    if (!token?.token) return;

    const socket = new SockJS(`https://summer2025-exe-be.onrender.com/ws?token=${token.token}`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log('[STOMP]', str),
      onConnect: () => {
        console.log('✅ STOMP connected');
        if (conversationId) {
          subscribeToConversation(conversationId);
        }
      },
      onStompError: (frame) => {
        console.error('❌ STOMP error:', frame);
      },
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      subscriptionRef.current?.unsubscribe();
      client.deactivate();
    };
  }, [token?.token]);

  useEffect(() => {
    if (
      stompClientRef.current?.connected &&
      conversationId &&
      currentConvIdRef.current !== conversationId // ✅ tránh sub trùng
    ) {
      subscriptionRef.current?.unsubscribe(); // unsubscribe trước
      subscribeToConversation(conversationId);
    }
  }, [conversationId]);

  const subscribeToConversation = (id) => {
    console.log(`📩 Subscribing to conversation: ${id}`);
    const sub = stompClientRef.current.subscribe(
      `/user/queue/conversation/${id}`,
      (message) => {
        const data = JSON.parse(message.body);
        console.log('📥 Message received:', data);
        setMessages((prev) => [...prev, data]);
      }
    );
    subscriptionRef.current = sub;
    currentConvIdRef.current = id; // ✅ cập nhật conversation hiện tại
  };

  const sendMessage = (msg) => {
    if (!stompClientRef.current?.connected) return;
    console.log('📤 Gửi tin nhắn:', msg);
    stompClientRef.current.send('/app/send-message', {}, JSON.stringify(msg));
  };

  return { messages, sendMessage };
};
