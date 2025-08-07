// ChatToggleBox.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';
import axios from 'axios';
import { chatService } from '../../services/chat.service';
import { useChatSocket } from '../../hook/useChatSocket';
import { useChatContext } from '../../context/ChatContext';
import { getEmailFromToken } from '../../config/jwtHelper';

const ChatToggleBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedRoles] = useState(['CONSULTANT']);
  const [historyMessages, setHistoryMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const { conversationId, setConversationId, token } = useChatContext();
  const { messages, sendMessage } = useChatSocket(conversationId, token);
  const myEmail = getEmailFromToken(token)?.toLowerCase();

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setSelectedAccount(null);
      setConversationId(null);
      setInput('');
      setHistoryMessages([]);
    }
  };

  const fetchAccountsByRoles = async () => {
    try {
      const response = await axios.get('https://summer2025-exe-be.onrender.com/get-accounts-by-role', {
        params: { roles: selectedRoles },
        paramsSerializer: (params) =>
          params.roles.map((r) => `roles=${encodeURIComponent(r)}`).join('&'),
      });
      setAccounts(response.data?.data || []);
    } catch (err) {
      console.error('❌ Lỗi lấy danh sách tài khoản:', err);
    }
  };

  useEffect(() => {
    if (isOpen && !selectedAccount) {
      fetchAccountsByRoles();
    }
  }, [isOpen]);

  const handleSelectAccount = async (account) => {
    try {
      const email = account.email;
      const res = await chatService.createConversation({
        type: 'private',
        participantId: [email],
      });
      const id = res?.data?.id || res?.data?.data?.id;
      if (!id) throw new Error('Không nhận được ID cuộc trò chuyện');
      setConversationId(id);
      setSelectedAccount(account);
    } catch (err) {
      console.error('❌ Lỗi tạo cuộc trò chuyện:', err);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) return;
      try {
        const res = await chatService.getMessages(conversationId);
        setHistoryMessages(res.reverse());
      } catch (err) {
        console.error('❌ Lỗi tải lịch sử:', err);
      }
    };
    fetchMessages();
  }, [conversationId]);

  const handleSendMessage = () => {
    if (!input.trim() || !conversationId) return;
    sendMessage({ conversationId, content: input.trim() });
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, historyMessages]);

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
        <div className="fixed bottom-4 right-4 w-80 bg-white shadow-lg border rounded-xl z-50 flex flex-col overflow-hidden">
          <div className="bg-pink-500 text-white px-4 py-2 flex justify-between items-center">
            <span className="font-bold">Hỗ trợ tư vấn</span>
            <button onClick={toggleChat}><X size={20} /></button>
          </div>

          {!selectedAccount ? (
            <div className="p-4 space-y-2 h-64 overflow-y-auto">
              <p className="text-sm">Chọn người bạn muốn trò chuyện:</p>
              {accounts.length > 0 ? accounts.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => handleSelectAccount(acc)}
                  className="block w-full text-left px-3 py-2 border rounded hover:bg-gray-100"
                >
                  {acc.name || acc.email}
                </button>
              )) : <p className="text-sm italic">Không tìm thấy tài khoản phù hợp.</p>}
            </div>
          ) : (
            <>
              <div className="h-64 overflow-y-auto p-4 space-y-2 flex flex-col">
                {[...historyMessages, ...messages].map((msg, idx) => {
                  const rawEmail = msg?.sender?.email || msg?.senderEmail || '';
                  const senderEmail = typeof rawEmail === 'string' ? rawEmail.toLowerCase() : '';
                  const isMine = senderEmail === myEmail;

                  //console.log(`[Message ${idx}]`, { senderEmail, myEmail, isMine });

                  const messageText = msg.content || msg.message || msg.text || '...';

                  return (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg max-w-xs ${
                        isMine
                          ? 'bg-blue-100 self-end ml-auto text-right'
                          : 'bg-gray-200 self-start text-left'
                      }`}
                    >
                      {messageText}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex items-center border-t p-2">
                <input
                  className="flex-1 border rounded-full px-3 py-1 text-sm"
                  placeholder="Nhập tin nhắn..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage} className="ml-2 p-2 bg-pink-500 text-white rounded-full">
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatToggleBox;
