import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { getEmailFromToken } from '../config/jwtHelper';

export const useChatSocket = (conversationId, token) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    if (!conversationId || !token) return;

    const jwtToken = typeof token === 'string' ? token : token?.token;
    if (!jwtToken || !jwtToken.includes('.')) return;

    const socket = new SockJS(`http://localhost:8080/ws?token=${jwtToken}`);
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect({}, () => {
      setIsConnected(true);

      // Hủy đăng ký cũ nếu có
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }

      // Đăng ký nhận tin nhắn cho conversation hiện tại
      subscriptionRef.current = stompClient.subscribe(
        `/user/queue/conversation/${conversationId}`,
        (msg) => {
          const data = JSON.parse(msg.body);
          setMessages((prev) => [...prev, data]);
        }
      );
    }, () => setIsConnected(false));

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      if (stompClient.connected) {
        stompClient.disconnect(() => console.log('🛑 STOMP disconnected'));
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
    // ❌ KHÔNG setMessages ở đây nữa vì server sẽ phản hồi lại
  };

  return { messages, sendMessage, isConnected };
};
