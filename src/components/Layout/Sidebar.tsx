
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
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
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
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-64
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">HMS</h2>
          <button 
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-4 py-3 text-gray-700 hover:bg-medical-purple hover:text-medical-blue transition-colors duration-200
                ${isActive ? 'bg-medical-purple text-medical-blue border-r-2 border-medical-blue' : ''}
              `}
              onClick={() => window.innerWidth < 1024 && onClose()}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
