'use client';

import { useEffect, useRef, useMemo } from 'react';
import { ChatState, DoraemonGadget, DoraemonSticker } from '@/types/chat';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { GadgetMenu } from './GadgetMenu';
import { DoraemonStickers } from './DoraemonStickers';
import { CharacterAvatar } from './CharacterAvatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getLastSeenText, getGadgetMessage } from '@/lib/chatUtils';

interface ChatInterfaceProps {
  chatState: ChatState;
  onSendMessage: (content: string, type?: 'text' | 'gadget' | 'sticker', gadgetId?: string) => void;
  onToggleGadgetMenu: () => void;
  onToggleStickerMenu: () => void;
}

export function ChatInterface({ 
  chatState, 
  onSendMessage, 
  onToggleGadgetMenu,
  onToggleStickerMenu 
}: ChatInterfaceProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeRoom = useMemo(() => {
    return chatState.chatRooms.find(room => room.id === chatState.activeChat);
  }, [chatState.chatRooms, chatState.activeChat]);

  const otherParticipant = useMemo(() => {
    if (!activeRoom) return null;
    return activeRoom.participants.find(p => p.id !== chatState.currentUser.id) || activeRoom.participants[0];
  }, [activeRoom, chatState.currentUser.id]);

  const isGroupChat = useMemo(() => {
    return activeRoom ? activeRoom.participants.length > 2 : false;
  }, [activeRoom]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeRoom?.messages]);

  const handleGadgetSelect = (gadget: DoraemonGadget) => {
    const gadgetMessage = getGadgetMessage(gadget.id);
    onSendMessage(gadgetMessage, 'gadget', gadget.id);
  };

  const handleStickerSelect = (sticker: DoraemonSticker) => {
    onSendMessage(sticker.image, 'sticker');
  };

  if (!activeRoom || !otherParticipant) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
        <div className="text-center p-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-blue-200 rounded-full flex items-center justify-center">
            <img
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/07771c61-1177-4214-9fe5-792973a8756f.png"
              alt="Welcome to DoraChat"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-blue-800 mb-2 font-fredoka">
            Welcome to DoraChat!
          </h2>
          <p className="text-blue-600">
            Select a chat from the sidebar to start messaging with your favorite characters!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-blue-50 to-white relative">
      {/* Chat Header */}
      <div className="bg-white border-b border-blue-200 p-4 shadow-sm">
        <div className="flex items-center space-x-4">
          <CharacterAvatar
            character={otherParticipant}
            size="md"
            showOnlineStatus={!isGroupChat}
          />
          
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">
              {isGroupChat ? activeRoom.name : otherParticipant.name}
            </h2>
            <p className="text-sm text-gray-600">
              {isGroupChat 
                ? `${activeRoom.participants.length} participants` 
                : getLastSeenText(otherParticipant)
              }
            </p>
          </div>

          {/* Chat Actions */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors">
              📞
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors">
              🎥
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors">
              ⋯
            </div>
          </div>
        </div>

        {/* Typing Indicator */}
        <div className="mt-2 h-4">
          {/* Simulate typing indicator occasionally */}
          <div className="text-sm text-blue-600 italic opacity-0">
            {otherParticipant.name} is typing...
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-1 max-w-4xl mx-auto">
          {activeRoom.messages.map((message, index) => {
            const showAvatar = index === 0 || 
              activeRoom.messages[index - 1].senderId !== message.senderId ||
              (message.timestamp.getTime() - activeRoom.messages[index - 1].timestamp.getTime()) > 300000; // 5 minutes

            return (
              <MessageBubble
                key={message.id}
                message={message}
                showAvatar={showAvatar}
              />
            );
          })}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <MessageInput
        onSendMessage={(message) => onSendMessage(message, 'text')}
        onToggleGadgetMenu={onToggleGadgetMenu}
        onToggleStickerMenu={onToggleStickerMenu}
        placeholder={`Message ${isGroupChat ? activeRoom.name : otherParticipant.name}...`}
      />

      {/* Gadget Menu */}
      <GadgetMenu
        gadgets={chatState.gadgets}
        isOpen={chatState.isGadgetMenuOpen}
        onGadgetSelect={handleGadgetSelect}
        onClose={onToggleGadgetMenu}
      />

      {/* Sticker Menu */}
      <DoraemonStickers
        stickers={chatState.stickers}
        isOpen={chatState.isStickerMenuOpen}
        onStickerSelect={handleStickerSelect}
        onClose={onToggleStickerMenu}
      />

      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-8 h-8 bg-yellow-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-40 left-10 w-4 h-4 bg-pink-200 rounded-full opacity-25"></div>
        <div className="absolute bottom-60 left-20 w-5 h-5 bg-yellow-300 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
        
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230066CC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>
    </div>
  );
}