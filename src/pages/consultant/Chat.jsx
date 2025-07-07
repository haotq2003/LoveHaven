import React, { useState, useEffect, useRef } from 'react'
import { Send, Search, Phone, Video, MoreVertical, User, MessageSquare } from 'lucide-react'
import { useChatContext } from '../../context/ChatContext'
import { useChatSocket } from '../../hook/useChatSocket'

const mockUserId = 1 // Giả lập user đang đăng nhập

const mockDoctors = [
  { id: 2, name: 'Dr. A', avatar: '', specialization: 'Tâm lý học' },
  { id: 3, name: 'Dr. B', avatar: '', specialization: 'Tâm thần học' },
]

const mockConversations = [
  {
    id: 101,
    participants: [{ id: mockUserId }, { id: 2, name: 'Dr. A', avatar: '', isOnline: true }],
    lastMessage: { content: 'Chào bạn, tôi có thể giúp gì?' },
    unreadCount: 1
  }
]

const mockMessages = [
  {
    id: 1,
    senderId: 2,
    content: 'Chào bạn, tôi có thể giúp gì?',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    senderId: mockUserId,
    content: 'Tôi đang gặp vấn đề về giấc ngủ...',
    createdAt: new Date().toISOString()
  }
]

const Chat = () => {
   const { conversationId, token } = useChatContext();
  const { messages, sendMessage } = useChatSocket(conversationId, token);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage({ conversationId, message: newMessage });
    setNewMessage('');
  };


 

 

 


  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
           
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Bác sĩ</h3>
            <div className="space-y-2">
             
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Cuộc trò chuyện gần đây</h3>
            <div className="space-y-2">
              
            </div>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
    
    </div>
  )
}

export default Chat
