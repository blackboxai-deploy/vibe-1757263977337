'use client';

import { ChatMessage } from '@/types/chat';
import { CharacterAvatar } from './CharacterAvatar';
import { formatTimestamp } from '@/lib/chatUtils';
import { getCharacterById } from '@/lib/characters';
import { getGadgetById } from '@/lib/gadgets';

interface MessageBubbleProps {
  message: ChatMessage;
  showAvatar?: boolean;
}

export function MessageBubble({ message, showAvatar = true }: MessageBubbleProps) {
  const character = getCharacterById(message.senderId);
  const gadget = message.gadgetUsed ? getGadgetById(message.gadgetUsed) : null;

  return (
    <div className={`
      flex items-end space-x-2 mb-4 doraemon-slide-in
      ${message.isOwn ? 'flex-row-reverse space-x-reverse' : 'flex-row'}
    `}>
      {/* Avatar */}
      {showAvatar && character && (
        <div className="flex-shrink-0">
          <CharacterAvatar
            character={character}
            size="sm"
            showOnlineStatus={false}
          />
        </div>
      )}

      {/* Message Content */}
      <div className={`
        max-w-xs lg:max-w-md xl:max-w-lg
        ${message.isOwn ? 'ml-auto' : 'mr-auto'}
      `}>
        {/* Sender Name (for group chats or non-own messages) */}
        {!message.isOwn && showAvatar && (
          <p className="text-xs text-gray-600 mb-1 px-2">
            {message.senderName}
          </p>
        )}

        {/* Message Bubble */}
        <div className={`
          relative px-4 py-3 rounded-2xl shadow-lg
          ${message.isOwn 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md' 
            : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
          }
          ${message.type === 'gadget' ? 'border-2 border-yellow-400 shadow-yellow-200 shadow-lg' : ''}
        `}>
          {/* Gadget Header */}
          {message.type === 'gadget' && gadget && (
            <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-opacity-30">
              <img
                src={gadget.icon}
                alt={gadget.name}
                className="w-6 h-6 rounded-full"
              />
              <span className={`
                text-sm font-semibold
                ${message.isOwn ? 'text-yellow-200' : 'text-yellow-600'}
              `}>
                {gadget.name}
              </span>
            </div>
          )}

          {/* Sticker Message */}
          {message.type === 'sticker' && (
            <div className="flex items-center justify-center p-2">
              <img
                src={message.content}
                alt="Sticker"
                className="w-24 h-24 rounded-lg"
              />
            </div>
          )}

          {/* Text/Gadget Message */}
          {(message.type === 'text' || message.type === 'gadget') && (
            <p className={`
              text-sm leading-relaxed
              ${message.type === 'gadget' ? 'italic' : ''}
            `}>
              {message.content}
            </p>
          )}

          {/* Message Timestamp */}
          <div className={`
            flex items-center justify-end space-x-1 mt-2 text-xs opacity-70
            ${message.isOwn ? 'text-blue-100' : 'text-gray-500'}
          `}>
            <span>{formatTimestamp(message.timestamp)}</span>
            
            {/* Message Status for own messages */}
            {message.isOwn && (
              <div className="flex space-x-1">
                <div className="w-3 h-3 text-blue-200">✓</div>
                <div className="w-3 h-3 text-blue-200">✓</div>
              </div>
            )}
          </div>

          {/* Gadget Effect Animation */}
          {message.type === 'gadget' && gadget && (
            <div className="absolute -top-2 -right-2 w-6 h-6">
              {gadget.effect === 'teleport' && (
                <div className="w-full h-full bg-pink-400 rounded-full animate-ping opacity-75"></div>
              )}
              {gadget.effect === 'flying' && (
                <div className="w-full h-full bg-yellow-400 rounded-full doraemon-bounce"></div>
              )}
              {gadget.effect === 'time-travel' && (
                <div className="w-full h-full bg-blue-400 rounded-full animate-pulse"></div>
              )}
              {gadget.effect === 'memory' && (
                <div className="w-full h-full bg-purple-400 rounded-full animate-pulse"></div>
              )}
            </div>
          )}
        </div>

        {/* Message Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className={`
            flex items-center space-x-1 mt-1 px-2
            ${message.isOwn ? 'justify-end' : 'justify-start'}
          `}>
            {message.reactions.map((reaction, index) => (
              <div
                key={index}
                className="bg-white rounded-full px-2 py-1 border border-gray-200 shadow-sm text-sm"
              >
                {reaction.emoji}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}