import React, { useState, useRef, useEffect } from 'react';
import { Menu, User, LogOut, Settings, ChevronDown, UserCircle, PanelLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
  onSidebarToggle: () => void;
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onSidebarToggle, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfile = () => {
    setIsDropdownOpen(false);
    navigate('/user-profile');
  };

  const handleChangePassword = () => {
    setIsDropdownOpen(false);
    navigate('/change-password');
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30 w-full">
      {/* Main Header */}
      <div className="px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-1 sm:p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Right Section - User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs sm:text-sm font-medium text-gray-700">{user?.name || 'Demo User'}</p>
                <p className="text-xs text-gray-500">{user?.role || 'Admin'}</p>
              </div>
              <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* User Info */}
                <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{user?.name || 'Demo User'}</p>
                      <p className="text-xs text-gray-500 truncate">demo@madhavhospital.com</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    onClick={handleProfile}
                    className="w-full flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <UserCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
                    Profile
                  </button>
                  
                  <button
                    onClick={handleChangePassword}
                    className="w-full flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
                    Change Password
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
