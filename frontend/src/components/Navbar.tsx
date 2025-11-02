import React from 'react';
import { Cloud, LogOut } from 'lucide-react';

interface NavbarProps {
  username: string;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ username, onLogout }) => {
  return (
    <nav className="bg-[#F0F3FA] border-b border-[#B1C9EF] sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cloud className="w-8 h-8 text-[#84AAEC]" />
          <h1 className="text-2xl font-bold text-[#395886]">CloudPad</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#395886]">Hello, {username}</span>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

