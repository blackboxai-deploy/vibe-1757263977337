import { ChatRoom, ChatMessage, DoraemonSticker } from '@/types/chat';
import { doraemonCharacters } from '@/lib/characters';

// Sample chat messages
const sampleMessages: ChatMessage[] = [
  {
    id: 'msg_1',
    senderId: 'doraemon',
    senderName: 'Doraemon',
    content: 'Hello Nobita! How was school today?',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    type: 'text',
    isOwn: false,
    reactions: [],
  },
  {
    id: 'msg_2',
    senderId: 'nobita',
    senderName: 'Nobita',
    content: 'Not good... I forgot my homework again! 😭',
    timestamp: new Date(Date.now() - 3500000),
    type: 'text',
    isOwn: true,
    reactions: [],
  },
  {
    id: 'msg_3',
    senderId: 'doraemon',
    senderName: 'Doraemon',
    content: '✨ *Opens Anywhere Door* Where shall we go?',
    timestamp: new Date(Date.now() - 3400000),
    type: 'gadget',
    gadgetUsed: 'anywhere-door',
    isOwn: false,
    reactions: [],
  },
  {
    id: 'msg_4',
    senderId: 'nobita',
    senderName: 'Nobita',
    content: 'Wow! Let\'s go to the future to get my homework!',
    timestamp: new Date(Date.now() - 3300000),
    type: 'text',
    isOwn: true,
    reactions: [],
  },
  {
    id: 'msg_5',
    senderId: 'doraemon',
    senderName: 'Doraemon',
    content: '⏰ *Activates Time Machine* Which era should we visit?',
    timestamp: new Date(Date.now() - 3200000),
    type: 'gadget',
    gadgetUsed: 'time-machine',
    isOwn: false,
    reactions: [],
  },
];

const groupMessages: ChatMessage[] = [
  {
    id: 'group_msg_1',
    senderId: 'shizuka',
    senderName: 'Shizuka',
    content: 'Hi everyone! Should we meet at the park today?',
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    type: 'text',
    isOwn: false,
    reactions: [],
  },
  {
    id: 'group_msg_2',
    senderId: 'gian',
    senderName: 'Gian',
    content: 'Sure! I can sing my new song for everyone! 🎵',
    timestamp: new Date(Date.now() - 7100000),
    type: 'text',
    isOwn: false,
    reactions: [],
  },
  {
    id: 'group_msg_3',
    senderId: 'suneo',
    senderName: 'Suneo',
    content: 'I have a better idea! Let\'s go to my new mansion instead!',
    timestamp: new Date(Date.now() - 7000000),
    type: 'text',
    isOwn: false,
    reactions: [],
  },
  {
    id: 'group_msg_4',
    senderId: 'nobita',
    senderName: 'Nobita',
    content: 'The park sounds great! Doraemon, do you want to come?',
    timestamp: new Date(Date.now() - 6900000),
    type: 'text',
    isOwn: true,
    reactions: [],
  },
  {
    id: 'group_msg_5',
    senderId: 'doraemon',
    senderName: 'Doraemon',
    content: '🚁 *Takes off with Take-copter* Flying high!',
    timestamp: new Date(Date.now() - 6800000),
    type: 'gadget',
    gadgetUsed: 'take-copter',
    isOwn: false,
    reactions: [],
  },
];

// Sample chat rooms
export const sampleChatRooms: ChatRoom[] = [
  {
    id: 'chat_doraemon',
    name: 'Doraemon',
    participants: [doraemonCharacters[0], doraemonCharacters[1]], // Doraemon and Nobita
    messages: sampleMessages,
    lastMessage: sampleMessages[sampleMessages.length - 1],
    unreadCount: 2,
  },
  {
    id: 'chat_group',
    name: 'Friends Group 🌟',
    participants: doraemonCharacters,
    messages: groupMessages,
    lastMessage: groupMessages[groupMessages.length - 1],
    unreadCount: 1,
  },
  {
    id: 'chat_shizuka',
    name: 'Shizuka',
    participants: [doraemonCharacters[2], doraemonCharacters[1]], // Shizuka and Nobita
    messages: [
      {
        id: 'shizuka_msg_1',
        senderId: 'shizuka',
        senderName: 'Shizuka',
        content: 'Thank you for helping me with math yesterday! 📚',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        type: 'text',
        isOwn: false,
        reactions: [],
      },
    ],
    lastMessage: {
      id: 'shizuka_msg_1',
      senderId: 'shizuka',
      senderName: 'Shizuka',
      content: 'Thank you for helping me with math yesterday! 📚',
      timestamp: new Date(Date.now() - 86400000),
      type: 'text',
      isOwn: false,
      reactions: [],
    },
    unreadCount: 0,
  },
];

// Doraemon stickers
export const doraemonStickers: DoraemonSticker[] = [
  {
    id: 'sticker_happy_doraemon',
    name: 'Happy Doraemon',
    image: 'https://placehold.co/120x120?text=Happy+Doraemon+smiling+with+big+eyes+and+cheerful+expression',
    category: 'happy',
  },
  {
    id: 'sticker_sad_nobita',
    name: 'Sad Nobita',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0e0b1af5-4eb4-41d2-bb0c-f6fe3da11ac0.png',
    category: 'sad',
  },
  {
    id: 'sticker_excited_doraemon',
    name: 'Excited Doraemon',
    image: 'https://placehold.co/120x120?text=Excited+Doraemon+with+sparkling+eyes+and+raised+hands',
    category: 'excited',
  },
  {
    id: 'sticker_angry_gian',
    name: 'Angry Gian',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/99fc97c7-a18e-4673-b55a-942590fca8a1.png',
    category: 'angry',
  },
  {
    id: 'sticker_gadget_anywhere_door',
    name: 'Anywhere Door',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b8b8a564-5bf3-4be5-987b-2f40b3d835ae.png',
    category: 'gadget',
  },
  {
    id: 'sticker_dorayaki',
    name: 'Dorayaki Love',
    image: 'https://placehold.co/120x120?text=Doraemon+holding+dorayaki+with+hearts+in+eyes',
    category: 'happy',
  },
];