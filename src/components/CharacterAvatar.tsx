'use client';

import { DoraemonCharacter } from '@/types/chat';

interface CharacterAvatarProps {
  character: DoraemonCharacter;
  size?: 'sm' | 'md' | 'lg';
  showOnlineStatus?: boolean;
  className?: string;
}

export function CharacterAvatar({ 
  character, 
  size = 'md', 
  showOnlineStatus = false,
  className = '' 
}: CharacterAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const borderColors = {
    doraemon: 'border-blue-500',
    nobita: 'border-yellow-500',
    shizuka: 'border-pink-400',
    gian: 'border-orange-500',
    suneo: 'border-blue-400',
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          border-3 
          ${borderColors[character.id as keyof typeof borderColors] || 'border-gray-300'}
          shadow-lg 
          overflow-hidden 
          transition-all 
          duration-300 
          hover:scale-110
          hover:shadow-xl
        `}
        style={{ borderColor: character.color }}
      >
        <img
          src={character.avatar}
          alt={character.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8b409bae-1cc4-4240-993d-8191e7cd2c71.png}&bg=${character.color.replace('#', '')}&color=ffffff`;
          }}
        />
      </div>

      {/* Online Status Indicator */}
      {showOnlineStatus && (
        <div 
          className={`
            absolute 
            -bottom-1 
            -right-1 
            w-4 h-4 
            rounded-full 
            border-2 
            border-white 
            ${character.isOnline ? 'bg-green-500' : 'bg-gray-400'}
            ${character.isOnline ? 'animate-pulse' : ''}
          `}
        />
      )}

      {/* Character Personality Indicator */}
      <div 
        className="
          absolute 
          top-0 
          right-0 
          w-3 h-3 
          rounded-full 
          border 
          border-white 
          text-xs 
          flex 
          items-center 
          justify-center
        "
        style={{ backgroundColor: character.color }}
        title={character.personality}
      >
        {character.id === 'doraemon' && '🤖'}
        {character.id === 'nobita' && '👓'}
        {character.id === 'shizuka' && '🌸'}
        {character.id === 'gian' && '💪'}
        {character.id === 'suneo' && '💰'}
      </div>
    </div>
  );
}