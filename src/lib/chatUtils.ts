import { ChatMessage, DoraemonCharacter } from '@/types/chat';

export const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString();
  }
};

export const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const createMessage = (
  content: string,
  sender: DoraemonCharacter,
  type: 'text' | 'image' | 'sticker' | 'gadget' = 'text',
  gadgetUsed?: string
): ChatMessage => {
  return {
    id: generateMessageId(),
    senderId: sender.id,
    senderName: sender.name,
    content,
    timestamp: new Date(),
    type,
    gadgetUsed,
    isOwn: sender.id === 'nobita', // Assuming Nobita is current user
    reactions: [],
  };
};

export const getLastSeenText = (character: DoraemonCharacter): string => {
  if (character.isOnline) {
    return 'Online';
  }
  
  const lastSeenTimes = {
    shizuka: '2 hours ago',
    suneo: '1 day ago',
    gian: '30 minutes ago',
    doraemon: '5 minutes ago',
  };
  
  return `Last seen ${lastSeenTimes[character.id as keyof typeof lastSeenTimes] || '1 hour ago'}`;
};

export const getTypingIndicator = (character: DoraemonCharacter): string => {
  const typingMessages = {
    doraemon: 'Doraemon is searching for a gadget...',
    nobita: 'Nobita is typing...',
    shizuka: 'Shizuka is composing a message...',
    gian: 'Gian is typing loudly...',
    suneo: 'Suneo is crafting a response...',
  };
  
  return typingMessages[character.id as keyof typeof typingMessages] || `${character.name} is typing...`;
};

export const getGadgetMessage = (gadgetId: string): string => {
  const gadgetMessages = {
    'anywhere-door': '✨ *Opens Anywhere Door* Where shall we go?',
    'take-copter': '🚁 *Takes off with Take-copter* Flying high!',
    'memory-bread': '🍞 *Eats Memory Bread* Now I remember everything!',
    'translation-konjac': '🗣️ *Uses Translation Konjac* I can understand any language!',
    'time-machine': '⏰ *Activates Time Machine* Which era should we visit?',
    'small-light': '🔍 *Uses Small Light* Everything looks so big now!',
    'big-light': '🔎 *Uses Big Light* I feel like a giant!',
    'air-cannon': '💨 *Fires Air Cannon* Whoooosh!',
  };
  
  return gadgetMessages[gadgetId as keyof typeof gadgetMessages] || '✨ *Uses mysterious gadget*';
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};