export interface DoraemonCharacter {
  id: string;
  name: string;
  avatar: string;
  color: string;
  personality: string;
  catchphrase: string;
  isOnline: boolean;
}

export interface DoraemonGadget {
  id: string;
  name: string;
  description: string;
  icon: string;
  effect: string;
  color: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'sticker' | 'gadget';
  gadgetUsed?: string;
  isOwn: boolean;
  reactions?: MessageReaction[];
}

export interface MessageReaction {
  emoji: string;
  userId: string;
  userName: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: DoraemonCharacter[];
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
  unreadCount: number;
}

export interface DoraemonSticker {
  id: string;
  name: string;
  image: string;
  category: 'happy' | 'sad' | 'excited' | 'angry' | 'gadget';
}

export interface ChatState {
  currentUser: DoraemonCharacter;
  activeChat: string | null;
  chatRooms: ChatRoom[];
  characters: DoraemonCharacter[];
  gadgets: DoraemonGadget[];
  stickers: DoraemonSticker[];
  isGadgetMenuOpen: boolean;
  isStickerMenuOpen: boolean;
}