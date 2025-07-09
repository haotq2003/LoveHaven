import React, { useState, useEffect, useRef } from 'react';
import { Search, User } from 'lucide-react';
import { useChatContext } from '../../context/ChatContext';
import { useChatSocket } from '../../hook/useChatSocket';
import { getEmailFromToken } from '../../config/jwtHelper';

const Chat = () => {
  const { conversationId, token, setConversationId } = useChatContext();
  const { messages, sendMessage, isConnected } = useChatSocket(conversationId, token);
  const myEmail = getEmailFromToken(token);

  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [historyMessages, setHistoryMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/conversation/my-conversations', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setConversations(data.data || []);
      } catch (error) {
        console.error('❌ Lỗi khi lấy conversations:', error);
      }
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) return;
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/messages/conversation/${conversationId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setHistoryMessages(data.data?.reverse() || []);
      } catch (err) {
        console.error('❌ Lỗi khi lấy tin nhắn:', err);
      }
    };
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, historyMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId || !isConnected) {
      console.warn('⛔ Không thể gửi tin nhắn: kết nối chưa sẵn sàng hoặc nội dung rỗng');
      return;
    }

    sendMessage({
      conversationId,
      content: newMessage.trim(),
    });

    setNewMessage('');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full pl-10 pr-3 py-2 border rounded bg-gray-100 text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Cuộc trò chuyện gần đây
            </h3>
            <div className="space-y-2">
              {conversations.map((conv) => {
                const other = conv.participants?.find((p) => p.email !== myEmail);
                const name = other?.name || 'Không rõ tên';

                return (
                  <div
                    key={conv.id}
                    className={`p-2 rounded hover:bg-gray-100 cursor-pointer border ${
                      conversationId === conv.id ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => setConversationId(conv.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{name}</div>
                        <div className="text-xs text-gray-500 truncate">
                          {conv.lastMessage?.content || conv.lastMessage?.message || 'Chưa có tin nhắn'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col">
        {!conversationId ? (
          <div className="p-4 text-gray-500">Chọn một cuộc trò chuyện để bắt đầu</div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white">
              {[...historyMessages, ...messages].map((msg, index) => {
                const senderEmail = msg.sender?.email || msg.senderEmail;
                const isMine = senderEmail === myEmail;
                const messageText = msg.content || msg.message || msg.text || '';
                const timestamp = msg.createdDate
                  ? new Date(msg.createdDate).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '';

                return (
                  <div key={index} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-2 rounded-lg max-w-xs ${
                        isMine
                          ? 'bg-blue-500 text-white self-end ml-auto'
                          : 'bg-gray-200 text-black self-start'
                      }`}
                    >
                      {messageText}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1">{timestamp}</span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {!isConnected && (
              <div className="text-xs text-red-500 text-center p-1">⚠️ Đang kết nối tới máy chủ...</div>
            )}

            <form onSubmit={handleSendMessage} className="flex border-t p-2 bg-white">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 border border-gray-300 rounded-full px-3 py-1 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={!isConnected || !newMessage.trim()}
                className={`ml-2 px-4 py-1 rounded-full text-white ${
                  isConnected && newMessage.trim()
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
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
