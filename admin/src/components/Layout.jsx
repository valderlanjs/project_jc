import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Image, 
  FileText, 
  ShoppingCart, 
  Users,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/',
      exact: true
    },
    {
      title: 'Hero Section',
      icon: Image,
      href: '/hero'
    },
    {
      title: 'Produtos',
      icon: ShoppingCart,
      href: '/products',
      comingSoon: true
    },
    {
      title: 'Serviços',
      icon: FileText,
      href: '/services',
      comingSoon: true
    },
    {
      title: 'Equipe',
      icon: Users,
      href: '/team',
      comingSoon: true
    }
  ];

  const isActive = (href, exact = false) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar para mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <h1 className="text-lg font-semibold">Menu</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="mt-8 px-4 space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive(item.href, item.exact)
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  } ${item.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.title}
                  {item.comingSoon && (
                    <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      Em breve
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar para desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-1 min-h-0 bg-white border-r">
            <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
              <h1 className="text-xl font-bold text-gray-900">Madeireira Pro</h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="mt-8 flex-1 px-4 space-y-2">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                      isActive(item.href, item.exact)
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    } ${item.comingSoon ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.title}
                    {item.comingSoon && (
                      <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                        Em breve
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64 flex flex-col flex-1">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h2 className="text-lg font-semibold text-gray-900 ml-2 lg:ml-0">
                  {menuItems.find(item => isActive(item.href, item.exact))?.title || 'Dashboard'}
                </h2>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Olá, <strong>{user?.username}</strong>
                </span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sair</span>
                </button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 pb-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;