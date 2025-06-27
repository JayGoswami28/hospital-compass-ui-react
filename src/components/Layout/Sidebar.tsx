import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Syringe, 
  Bed, 
  UserCheck, 
  UserPlus, 
  Calendar,
  X,
  Settings,
  Clock,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isMobileOpen, onClose, onToggle }) => {
  const { user } = useAuth();

  const getNavigationItems = () => {
    if (user?.role === 'Receptionist') {
      return [
        { name: 'Receptionist Dashboard', path: '/receptionist', icon: LayoutDashboard },
        { name: 'Book Appointment', path: '/appointments', icon: Calendar },
      ];
    }
    
    // Admin and Doctor navigation
    return [
      { name: 'Admin Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Role Management', path: '/roles', icon: Settings },
      { name: 'Vaccine Management', path: '/vaccines', icon: Syringe },
      { name: 'Slot Management', path: '/slots', icon: Clock },
      { name: 'Bed Management', path: '/beds', icon: Bed },
      { name: 'User Management', path: '/users', icon: Users },
    ];
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-screen bg-white shadow-lg z-50 transform transition-all duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:z-auto lg:h-screen lg:translate-x-0
        ${isOpen ? 'lg:w-64' : 'lg:w-16'}
        w-64 sm:w-72 md:w-80 lg:w-64 flex-shrink-0
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 relative">
          <h2 className={`text-xl font-bold text-gray-800 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'lg:opacity-0'}`}>
            {isOpen || window.innerWidth < 1024 ? 'HMS' : ''}
          </h2>
          
          {/* Mobile close button */}
          <button 
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Desktop collapse/expand button */}
          <button
            onClick={onToggle}
            className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border border-gray-300 rounded-sm shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center"
            title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? (
              <ChevronLeft className="w-3 h-3 text-gray-600" />
            ) : (
              <ChevronRight className="w-3 h-3 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 group
                ${isActive ? 'bg-indigo-50 text-indigo-600 border-r-2 border-indigo-600' : ''}
              `}
              onClick={() => window.innerWidth < 1024 && onClose()}
              title={!isOpen ? item.name : ''}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isOpen ? 'mr-3' : 'mx-auto'} transition-all duration-300`} />
              <span className={`font-medium transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'lg:opacity-0 lg:w-0 lg:overflow-hidden'}`}>
                {isOpen || window.innerWidth < 1024 ? item.name : ''}
              </span>
              
              {/* Tooltip for collapsed state */}
              {!isOpen && (
                <div className="hidden lg:block absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
