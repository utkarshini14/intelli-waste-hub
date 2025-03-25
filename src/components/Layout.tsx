import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Camera, 
  MessageSquare, 
  Gamepad, 
  ShoppingBag, 
  Menu, 
  X, 
  Home,
  Recycle
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isActive }) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 hover-lift ${
        isActive 
          ? 'bg-intelliwaste-blue text-white shadow-md' 
          : 'text-intelliwaste-gray-dark hover:bg-intelliwaste-gray'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/recognition', icon: Camera, label: 'Image Recognition' },
    { to: '/chatbot', icon: MessageSquare, label: 'Smart Assistant' },
    { to: '/game', icon: Gamepad, label: 'Waste Game' },
    { to: '/marketplace', icon: ShoppingBag, label: 'Marketplace' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-yellow-700">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-glass-sm border-b border-intelliwaste-gray-medium">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Recycle size={28} style={{ color: "#859F3D" }} />
            <span className="text-xl font-semibold" style={{ color: '#859F3D' }}>
  INTELLI<span className="font-light">waste</span>
</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavItem 
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.to}
              />
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="p-2 text-intelliwaste-gray-dark hover:bg-intelliwaste-gray rounded-full md:hidden transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      
      {/* Mobile Navigation Drawer */}
      <div 
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />
      
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-4/5 max-w-xs bg-white shadow-glass-lg md:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Recycle size={24} className="text-intelliwaste-blue" />
              <span className="text-lg font-semibold">INTELLIwaste</span>
            </div>
            <button 
              onClick={toggleMenu}
              className="p-2 text-intelliwaste-gray-dark hover:bg-intelliwaste-gray rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-all ${
                  location.pathname === item.to
                    ? 'bg-intelliwaste-blue text-white'
                    : 'text-intelliwaste-gray-dark hover:bg-intelliwaste-gray'
                }`}
                onClick={toggleMenu}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="animate-fade-in">{children}</div>
      </main>
      
      {/* Footer */}
      <footer className="bg-intelliwaste-gray py-8 border-t border-intelliwaste-gray-medium">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Recycle size={20} className="text-intelliwaste-blue" />
              <span className="text-sm font-semibold">
                INTELLI<span className="font-light">waste</span>
              </span>
            </div>
            <div className="text-sm text-intelliwaste-gray-dark">
              &copy; {new Date().getFullYear()} INTELLIwaste. All rights reserved. Made by Utk & Kj
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
