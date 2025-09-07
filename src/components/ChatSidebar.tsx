'use client';

import { ChatRoom } from '@/types/chat';
import { CharacterAvatar } from './CharacterAvatar';
import { formatTimestamp } from '@/lib/chatUtils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface ChatSidebarProps {
  chatRooms: ChatRoom[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
  isCollapsed: boolean;
}

export function ChatSidebar({ 
  chatRooms, 
  activeChat, 
  onChatSelect, 
  isCollapsed 
}: ChatSidebarProps) {
  if (isCollapsed) {
    return (
      <div className="w-16 bg-white border-r border-blue-200 shadow-lg">
        <div className="p-2 space-y-3">
          {chatRooms.slice(0, 4).map((room) => {
            const otherParticipant = room.participants.find(p => p.id !== 'nobita') || room.participants[0];
            const isActive = room.id === activeChat;
            
            return (
              <div
                key={room.id}
                className="relative"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onChatSelect(room.id)}
                  className={`
                    w-12 h-12 p-1 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-100 border-2 border-blue-400 shadow-md' 
                      : 'hover:bg-blue-50 border border-transparent'
                    }
                  `}
                >
                  <CharacterAvatar
                    character={otherParticipant}
                    size="sm"
                    showOnlineStatus
                  />
                </Button>
                
                {room.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {room.unreadCount > 9 ? '9+' : room.unreadCount}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-blue-200 shadow-lg flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-blue-100">
        <h2 className="text-xl font-bold text-blue-800 font-fredoka doraemon-text-shadow">
          Chats
        </h2>
        <p className="text-sm text-blue-600">
          Talk to your favorite characters! ✨
        </p>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {chatRooms.map((room) => {
            const otherParticipant = room.participants.find(p => p.id !== 'nobita') || room.participants[0];
            const isActive = room.id === activeChat;
            const isGroup = room.participants.length > 2;
            
            return (
              <div
                key={room.id}
                onClick={() => onChatSelect(room.id)}
                className={`
                  p-3 rounded-2xl cursor-pointer transition-all duration-200
                  doraemon-fade-in
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-100 to-blue-50 border-2 border-blue-300 shadow-md' 
                    : 'hover:bg-blue-50 border border-transparent hover:border-blue-200'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <CharacterAvatar
                      character={otherParticipant}
                      size="md"
                      showOnlineStatus={!isGroup}
                    />
                    
                    {/* Group indicator */}
                    {isGroup && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                        <span className="text-xs">👥</span>
                      </div>
                    )}
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`
                        font-semibold truncate 
                        ${isActive ? 'text-blue-800' : 'text-gray-800'}
                      `}>
                        {isGroup ? room.name : otherParticipant.name}
                      </h3>
                      
                      {room.lastMessage && (
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(room.lastMessage.timestamp)}
                        </span>
                      )}
                    </div>

                    {/* Last Message Preview */}
                    {room.lastMessage && (
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-600 truncate flex-1">
                          {room.lastMessage.type === 'gadget' 
                            ? '✨ Used a gadget'
                            : room.lastMessage.type === 'sticker'
                            ? '😊 Sent a sticker'
                            : room.lastMessage.content
                          }
                        </p>
                        
                        {room.unreadCount > 0 && (
                          <div className="ml-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {room.unreadCount > 9 ? '9+' : room.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Character Status */}
                    {!isGroup && (
                      <p className="text-xs text-gray-500 mt-1">
                        {otherParticipant.isOnline ? 'Online' : 'Last seen recently'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-blue-100">
        <div className="flex items-center space-x-3">
          <CharacterAvatar
            character={{
              id: 'nobita',
              name: 'Nobita',
              avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/57787471-56a7-403d-8da5-0126c7af45fc.png',
              color: '#FFD700',
              personality: 'Current user',
              catchphrase: '',
              isOnline: true,
            }}
            size="sm"
            showOnlineStatus
          />
          <div>
            <p className="font-semibold text-gray-800">You (Nobita)</p>
            <p className="text-xs text-green-600">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
}