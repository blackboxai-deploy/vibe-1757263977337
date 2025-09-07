'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onToggleGadgetMenu: () => void;
  onToggleStickerMenu: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function MessageInput({ 
  onSendMessage, 
  onToggleGadgetMenu,
  onToggleStickerMenu,
  disabled = false,
  placeholder = "Type a message to your friends..." 
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      setIsTyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  return (
    <div className="p-4 bg-white border-t border-blue-200 shadow-lg">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Gadget Menu Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggleGadgetMenu}
            disabled={disabled}
            className="w-10 h-10 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white shadow-lg doraemon-bounce"
            title="Use Doraemon's Gadgets"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              🎒
            </div>
          </Button>

          {/* Sticker Menu Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onToggleStickerMenu}
            disabled={disabled}
            className="w-10 h-10 rounded-full bg-pink-400 hover:bg-pink-500 text-white shadow-lg"
            title="Send Stickers"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              😊
            </div>
          </Button>
        </div>

        {/* Message Input */}
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            type="text"
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="
              w-full py-3 px-4 pr-12 rounded-2xl border-2 border-blue-200 
              focus:border-blue-400 focus:ring-2 focus:ring-blue-200 
              bg-blue-50 placeholder-blue-400
              transition-all duration-200
              text-gray-800
            "
          />

          {/* Typing indicator */}
          {isTyping && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          className="
            w-12 h-12 rounded-full 
            bg-gradient-to-r from-blue-500 to-blue-600 
            hover:from-blue-600 hover:to-blue-700
            text-white shadow-lg
            disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed
            transition-all duration-200
            doraemon-glow
          "
          title="Send Message"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-b-2 border-t-transparent border-b-transparent ml-1"></div>
          </div>
        </Button>
      </form>

      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span>Online</span>
          </span>
          
          <span className="hidden md:block">
            Press Enter to send, Shift+Enter for new line
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-gray-500 hover:text-blue-600 px-2 py-1 rounded-lg"
          >
            📎 Attach
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-gray-500 hover:text-blue-600 px-2 py-1 rounded-lg"
          >
            🎤 Voice
          </Button>
        </div>
      </div>
    </div>
  );
}