'use client';

import { DoraemonSticker } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DoraemonStickersProps {
  stickers: DoraemonSticker[];
  isOpen: boolean;
  onStickerSelect: (sticker: DoraemonSticker) => void;
  onClose: () => void;
}

export function DoraemonStickers({ stickers, isOpen, onStickerSelect, onClose }: DoraemonStickersProps) {
  if (!isOpen) return null;

  const handleStickerClick = (sticker: DoraemonSticker) => {
    onStickerSelect(sticker);
    onClose();
  };

  const stickerCategories = [
    { id: 'happy', name: 'Happy', emoji: '😊' },
    { id: 'sad', name: 'Sad', emoji: '😢' },
    { id: 'excited', name: 'Excited', emoji: '🤩' },
    { id: 'angry', name: 'Angry', emoji: '😠' },
    { id: 'gadget', name: 'Gadgets', emoji: '⚡' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-20 z-40"
        onClick={onClose}
      />

      {/* Stickers Menu */}
      <div className="absolute bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-2xl shadow-2xl border border-pink-200 z-50 doraemon-fade-in">
        {/* Header */}
        <div className="p-4 border-b border-pink-100 bg-gradient-to-r from-pink-50 to-pink-100 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-pink-400 rounded-full flex items-center justify-center shadow-lg doraemon-bounce">
                <span className="text-lg">😊</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-pink-800 font-fredoka">
                  Doraemon Stickers
                </h3>
                <p className="text-sm text-pink-600">
                  Express yourself with characters!
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-pink-600 hover:text-pink-800 hover:bg-pink-200 rounded-full p-2"
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Sticker Categories */}
        <div className="p-3 border-b border-pink-100">
          <div className="flex space-x-2 overflow-x-auto">
            {stickerCategories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                size="sm"
                className="flex-shrink-0 px-3 py-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 border border-pink-200"
              >
                <span className="mr-1">{category.emoji}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Stickers Grid */}
        <ScrollArea className="max-h-80">
          <div className="p-4 grid grid-cols-3 gap-3">
            {stickers.map((sticker) => (
              <Button
                key={sticker.id}
                variant="ghost"
                onClick={() => handleStickerClick(sticker)}
                className="
                  aspect-square p-2 rounded-xl border-2 border-transparent
                  hover:border-pink-300 hover:bg-pink-50
                  transition-all duration-200
                  group
                "
              >
                <div className="w-full h-full flex flex-col items-center justify-center space-y-1">
                  {/* Sticker Image */}
                  <div className="w-16 h-16 rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-200">
                    <img
                      src={sticker.image}
                      alt={sticker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Sticker Name */}
                  <p className="text-xs text-gray-600 group-hover:text-pink-600 text-center leading-tight">
                    {sticker.name}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 border-t border-pink-100 bg-pink-50 rounded-b-2xl">
          <p className="text-xs text-pink-600 text-center">
            😊 Tap a sticker to share your emotions with friends!
          </p>
        </div>
      </div>
    </>
  );
}