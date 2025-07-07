import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';
import { chatService } from '../../services/chat.service';
import { useChatSocket } from '../../hook/useChatSocket';
import { useChatContext } from '../../context/ChatContext';

const ChatToggleBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const { conversationId, setConversationId, token } = useChatContext();
  const { messages, sendMessage } = useChatSocket(conversationId, token);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleCreateConversation = async () => {
    try {
      const res = await chatService.createConversation('manager@example.com');
      setConversationId(res.data.id); // lưu conversationId vào context
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendMessage = () => {
    if (!input.trim() || !conversationId) return;
    sendMessage({
      conversationId,
      content: input,
      senderEmail: token?.email, // hoặc lấy từ token nếu có
    });
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Gọi tạo conversation khi mở hộp chat nếu chưa có
  useEffect(() => {
    if (isOpen && !conversationId) {
      handleCreateConversation();
    }
  }, [isOpen]);

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full shadow-lg z-50"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg border border-gray-300 rounded-xl z-50 flex flex-col overflow-hidden">
          <div className="bg-pink-500 text-white px-4 py-2 flex justify-between items-center">
            <span className="font-bold">Hỗ trợ tư vấn</span>
            <button onClick={toggleChat} className="hover:text-gray-200">
              <X size={20} />
            </button>
          </div>

          <div className="h-64 overflow-y-auto p-4 space-y-2 flex flex-col">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-xs ${
                  msg.senderEmail === 'user'
                    ? 'bg-blue-100 self-end ml-auto text-right'
                    : 'bg-gray-200 text-left'
                }`}
              >
                {msg.text || msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center border-t p-2">
            <input
              className="flex-1 border border-gray-300 rounded-full px-3 py-1 text-sm outline-none"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatToggleBox;
