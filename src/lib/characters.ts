import { DoraemonCharacter } from '@/types/chat';

export const doraemonCharacters: DoraemonCharacter[] = [
  {
    id: 'doraemon',
    name: 'Doraemon',
    avatar: 'https://placehold.co/80x80?text=Doraemon+blue+robot+cat+with+round+face+and+red+collar',
    color: '#0066CC',
    personality: 'Helpful, caring, loves dorayaki',
    catchphrase: 'Ta-da! I have a gadget for that!',
    isOnline: true,
  },
  {
    id: 'nobita',
    name: 'Nobita',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8437ecf5-49f3-4909-99e1-8df95b395ede.png',
    color: '#FFD700',
    personality: 'Lazy, kind-hearted, always in trouble',
    catchphrase: 'Doraemon, help me!',
    isOnline: true,
  },
  {
    id: 'shizuka',
    name: 'Shizuka',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/dc7e5027-c44d-472e-b348-0da8899f7eee.png',
    color: '#FFB6C1',
    personality: 'Smart, kind, loves violin',
    catchphrase: 'That\'s wonderful!',
    isOnline: false,
  },
  {
    id: 'gian',
    name: 'Gian (Takeshi)',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/445fcf87-72a0-48d7-a8b4-5a809bc6c42d.png',
    color: '#FF6B35',
    personality: 'Strong, loud, loves singing',
    catchphrase: 'Listen to my song!',
    isOnline: true,
  },
  {
    id: 'suneo',
    name: 'Suneo',
    avatar: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7b672282-5a1e-4972-8fd0-eea3ec2b6020.png',
    color: '#87CEEB',
    personality: 'Rich, boastful, fashionable',
    catchphrase: 'I have something better!',
    isOnline: false,
  },
];

export const getCurrentUser = (): DoraemonCharacter => {
  return doraemonCharacters[1]; // Default to Nobita as current user
};

export const getCharacterById = (id: string): DoraemonCharacter | undefined => {
  return doraemonCharacters.find(char => char.id === id);
};