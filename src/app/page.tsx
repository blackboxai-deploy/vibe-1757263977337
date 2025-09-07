'use client';

import { useState, useCallback } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { ChatSidebar } from '@/components/ChatSidebar';
import { DoraemonHeader } from '@/components/DoraemonHeader';
import { sampleChatRooms } from '@/data/sampleChats';
import { getCurrentUser } from '@/lib/characters';
import { ChatState } from '@/types/chat';
import { doraemonGadgets } from '@/lib/gadgets';
import { doraemonStickers } from '@/data/sampleChats';

export default function Home() {
  const [chatState, setChatState] = useState<ChatState>({
    currentUser: getCurrentUser(),
    activeChat: 'chat_doraemon',
    chatRooms: sampleChatRooms,
    characters: [],
    gadgets: doraemonGadgets,
    stickers: doraemonStickers,
    isGadgetMenuOpen: false,
    isStickerMenuOpen: false,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleChatSelect = useCallback((chatId: string) => {
    setChatState(prev => ({
      ...prev,
      activeChat: chatId,
      chatRooms: prev.chatRooms.map(room => 
        room.id === chatId ? { ...room, unreadCount: 0 } : room
      ),
    }));
  }, []);

  const handleSendMessage = useCallback((content: string, type: 'text' | 'gadget' | 'sticker' = 'text', gadgetId?: string) => {
    const activeRoom = chatState.chatRooms.find(room => room.id === chatState.activeChat);
    if (!activeRoom) return;

    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      senderId: chatState.currentUser.id,
      senderName: chatState.currentUser.name,
      content,
      timestamp: new Date(),
      type,
      gadgetUsed: gadgetId,
      isOwn: true,
      reactions: [],
    };

    setChatState(prev => ({
      ...prev,
      chatRooms: prev.chatRooms.map(room =>
        room.id === chatState.activeChat
          ? {
              ...room,
              messages: [...room.messages, newMessage],
              lastMessage: newMessage,
            }
          : room
      ),
    }));

    // Simulate response from other characters after a delay
    if (type === 'gadget' && gadgetId) {
      setTimeout(() => {
        const responses = [
          "Wow! That's an amazing gadget!",
          "I wish I had one of those!",
          "So cool! How does it work?",
          "Can I try it too?",
          "Doraemon's gadgets are the best!"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const otherParticipant = activeRoom.participants.find(p => p.id !== chatState.currentUser.id);
        
        if (otherParticipant) {
          const responseMessage = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            senderId: otherParticipant.id,
            senderName: otherParticipant.name,
            content: randomResponse,
            timestamp: new Date(),
            type: 'text' as const,
            isOwn: false,
            reactions: [],
          };

          setChatState(prev => ({
            ...prev,
            chatRooms: prev.chatRooms.map(room =>
              room.id === chatState.activeChat
                ? {
                    ...room,
                    messages: [...room.messages, responseMessage],
                    lastMessage: responseMessage,
                  }
                : room
            ),
          }));
        }
      }, 1500);
    }
  }, [chatState.activeChat, chatState.currentUser, chatState.chatRooms]);

  const toggleGadgetMenu = useCallback(() => {
    setChatState(prev => ({
      ...prev,
      isGadgetMenuOpen: !prev.isGadgetMenuOpen,
      isStickerMenuOpen: false,
    }));
  }, []);

  const toggleStickerMenu = useCallback(() => {
    setChatState(prev => ({
      ...prev,
      isStickerMenuOpen: !prev.isStickerMenuOpen,
      isGadgetMenuOpen: false,
    }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-200 via-blue-100 to-white">
      {/* Header */}
      <DoraemonHeader 
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className={`
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'w-80' : 'w-0'}
          md:${isSidebarOpen ? 'w-80' : 'w-16'}
          flex-shrink-0
        `}>
          <ChatSidebar
            chatRooms={chatState.chatRooms}
            activeChat={chatState.activeChat}
            onChatSelect={handleChatSelect}
            isCollapsed={!isSidebarOpen}
          />
        </div>
        
        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          <ChatInterface
            chatState={chatState}
            onSendMessage={handleSendMessage}
            onToggleGadgetMenu={toggleGadgetMenu}
            onToggleStickerMenu={toggleStickerMenu}
          />
        </div>
      </div>
    </div>
  );
}