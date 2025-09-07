'use client';

import { Button } from '@/components/ui/button';

interface DoraemonHeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function DoraemonHeader({ onToggleSidebar, isSidebarOpen }: DoraemonHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="text-white hover:bg-blue-700 p-2"
          >
            <div className="space-y-1">
              <div className={`h-0.5 w-6 bg-white transition-all ${isSidebarOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <div className={`h-0.5 w-6 bg-white transition-all ${isSidebarOpen ? 'opacity-0' : ''}`} />
              <div className={`h-0.5 w-6 bg-white transition-all ${isSidebarOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </Button>

          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full p-1 shadow-lg">
              <img
                src="https://placehold.co/40x40?text=Doraemon+face+blue+robot+cat+with+smile"
                alt="Doraemon"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-fredoka doraemon-text-shadow">
                DoraChat
              </h1>
              <p className="text-blue-100 text-sm">
                Chat with magical friends! ✨
              </p>
            </div>
          </div>
        </div>

        {/* Status and Actions */}
        <div className="flex items-center space-x-4">
          {/* Online Status */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-100">Online</span>
          </div>

          {/* Bell Icon (Doraemon's bell) */}
          <div className="relative">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg doraemon-bounce cursor-pointer">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">3</span>
            </div>
          </div>

          {/* Settings */}
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-blue-700 p-2"
          >
            <div className="w-6 h-6 border-2 border-white rounded-full relative">
              <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-white rounded-full"></div>
            </div>
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-2 right-20 w-4 h-4 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-8 right-32 w-2 h-2 bg-white rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-4 left-96 w-3 h-3 bg-yellow-200 rounded-full opacity-40"></div>
      </div>
    </header>
  );
}