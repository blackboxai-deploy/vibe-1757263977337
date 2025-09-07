import { DoraemonGadget } from '@/types/chat';

export const doraemonGadgets: DoraemonGadget[] = [
  {
    id: 'anywhere-door',
    name: 'Anywhere Door',
    description: 'Travel anywhere instantly!',
    icon: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8b7d4a59-aefd-4879-9cc2-e7633f5205a9.png',
    effect: 'teleport',
    color: '#FF69B4',
  },
  {
    id: 'take-copter',
    name: 'Take-copter',
    description: 'Fly through the sky!',
    icon: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a650f91e-2586-40b7-87c7-db688007daf3.png',
    effect: 'flying',
    color: '#FFD700',
  },
  {
    id: 'memory-bread',
    name: 'Memory Bread',
    description: 'Remember everything you eat!',
    icon: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/011d4fa0-a022-4a7f-882b-cf54071a5e98.png',
    effect: 'memory',
    color: '#F5DEB3',
  },
  {
    id: 'translation-konjac',
    name: 'Translation Konjac',
    description: 'Understand any language!',
    icon: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/99bd49d1-f933-414d-88d5-5fd09d4e805f.png',
    effect: 'translate',
    color: '#9370DB',
  },
  {
    id: 'time-machine',
    name: 'Time Machine',
    description: 'Travel through time!',
    icon: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a657ff94-b5d1-4c4f-8e00-c07969b24600.png',
    effect: 'time-travel',
    color: '#4169E1',
  },
  {
    id: 'small-light',
    name: 'Small Light',
    description: 'Shrink anything to tiny size!',
    icon: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/681f7447-90fb-4418-84d6-b7382d9d800e.png',
    effect: 'shrink',
    color: '#32CD32',
  },
  {
    id: 'big-light',
    name: 'Big Light',
    description: 'Make anything giant size!',
    icon: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ec200b79-d4a0-4f67-9f5d-a60a5434d52a.png',
    effect: 'enlarge',
    color: '#FF4500',
  },
  {
    id: 'air-cannon',
    name: 'Air Cannon',
    description: 'Powerful wind blast!',
    icon: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/81510fda-f1f7-4291-a196-63de80c82183.png',
    effect: 'wind-blast',
    color: '#708090',
  },
];

export const getGadgetById = (id: string): DoraemonGadget | undefined => {
  return doraemonGadgets.find(gadget => gadget.id === id);
};

export const getRandomGadget = (): DoraemonGadget => {
  const randomIndex = Math.floor(Math.random() * doraemonGadgets.length);
  return doraemonGadgets[randomIndex];
};