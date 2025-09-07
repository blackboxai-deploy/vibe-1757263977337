'use client';

import { DoraemonGadget } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface GadgetMenuProps {
  gadgets: DoraemonGadget[];
  isOpen: boolean;
  onGadgetSelect: (gadget: DoraemonGadget) => void;
  onClose: () => void;
}

export function GadgetMenu({ gadgets, isOpen, onGadgetSelect, onClose }: GadgetMenuProps) {
  if (!isOpen) return null;

  const handleGadgetClick = (gadget: DoraemonGadget) => {
    onGadgetSelect(gadget);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-20 z-40"
        onClick={onClose}
      />

      {/* Gadget Menu */}
      <div className="absolute bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-2xl shadow-2xl border border-blue-200 z-50 doraemon-fade-in">
        {/* Header */}
        <div className="p-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg doraemon-bounce">
                <span className="text-lg">🎒</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-800 font-fredoka">
                  Doraemon's Gadgets
                </h3>
                <p className="text-sm text-blue-600">
                  Choose a magical gadget!
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full p-2"
            >
              ✕
            </Button>
          </div>
        </div>

        {/* Gadgets Grid */}
        <ScrollArea className="max-h-80">
          <div className="p-4 grid grid-cols-2 gap-3">
            {gadgets.map((gadget) => (
              <Button
                key={gadget.id}
                variant="ghost"
                onClick={() => handleGadgetClick(gadget)}
                className="
                  h-auto p-3 flex flex-col items-center space-y-2 
                  rounded-xl border-2 border-transparent
                  hover:border-yellow-300 hover:bg-yellow-50
                  transition-all duration-200
                  group
                "
              >
                {/* Gadget Icon */}
                <div 
                  className="w-12 h-12 rounded-full p-2 shadow-md group-hover:scale-110 transition-transform duration-200"
                  style={{ backgroundColor: gadget.color + '20' }}
                >
                  <img
                    src={gadget.icon}
                    alt={gadget.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                {/* Gadget Info */}
                <div className="text-center">
                  <h4 className="font-semibold text-sm text-gray-800 group-hover:text-blue-800">
                    {gadget.name}
                  </h4>
                  <p className="text-xs text-gray-600 group-hover:text-blue-600 mt-1 leading-tight">
                    {gadget.description}
                  </p>
                </div>

                {/* Gadget Effect Preview */}
                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full group-hover:bg-yellow-100 group-hover:text-yellow-700">
                  {gadget.effect}
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 border-t border-blue-100 bg-blue-50 rounded-b-2xl">
          <p className="text-xs text-blue-600 text-center">
            ✨ Tap a gadget to use its magical power in your message!
          </p>
        </div>
      </div>
    </>
  );
}