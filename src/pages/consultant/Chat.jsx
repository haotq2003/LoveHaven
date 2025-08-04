import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useChatContext } from '../../context/ChatContext';
import { useChatSocket } from '../../hook/useChatSocket';
import { getEmailFromToken } from '../../config/jwtHelper';

const Chat = () => {
  const { conversationId, token, setConversationId } = useChatContext();
  const { messages, sendMessage } = useChatSocket(conversationId, token);
  const myEmail = getEmailFromToken(token)?.toLowerCase();

  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [historyMessages, setHistoryMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await fetch('https://summer2025-exe-be.onrender.com/conversation/my-conversations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setConversations(data.data || []);
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) return;
      const res = await fetch(`https://summer2025-exe-be.onrender.com/messages/conversation/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setHistoryMessages(data.data?.reverse() || []);
    };
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, historyMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage({ conversationId, content: newMessage.trim() });
    setNewMessage('');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar conversation list */}
      <div className="w-1/4 border-r p-4 bg-white overflow-y-auto">
        <div className="mb-4 relative">
          <Search className="absolute left-2 top-2 text-gray-400" size={16} />
          <input
            className="pl-8 pr-3 py-2 border rounded w-full text-sm"
            placeholder="Tìm kiếm..."
          />
        </div>
        {conversations.map((conv) => {
          const other = conv.participants?.find((p) => p.email?.toLowerCase() !== myEmail);
          const displayName = other?.name || other?.email || 'Không xác định';

          return (
            <div
              key={conv.id}
              onClick={() => setConversationId(conv.id)}
              className={`p-2 border rounded mb-2 cursor-pointer ${
                conv.id === conversationId ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">{displayName}</div>
              <div className="text-sm text-gray-500 truncate">
                {conv.lastMessage?.content || 'Chưa có tin nhắn'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Chat content area */}
      <div className="flex-1 flex flex-col bg-white">
        {!conversationId ? (
          <div className="p-4 text-gray-500">Chọn một cuộc trò chuyện để bắt đầu</div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {[...historyMessages, ...messages].map((msg, i) => {
                const rawEmail = msg?.sender?.email || msg?.senderEmail || '';
                const senderEmail = typeof rawEmail === 'string' ? rawEmail.toLowerCase() : '';
                const isMine = senderEmail === myEmail;

                return (
                  <div key={i} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-3 py-2 rounded-xl max-w-xs ${
                        isMine ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                      }`}
                    >
                      {msg.content || msg.message || ''}
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(msg.createdDate).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input box */}
            <form onSubmit={handleSendMessage} className="flex p-2 border-t">
              <input
                className="flex-1 border rounded-full px-4 py-2 mr-2"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">
                Gửi
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
