
import React, { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { usePWA } from '@/hooks/usePWA';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { installApp, canInstall, isIOS } = usePWA();

  const menuItems = [
    {
      name: 'Início',
      href: '#home'
    },
    {
      name: 'Serviços',
      href: '#services'
    },
    {
      name: 'Produtos',
      href: '#products'
    },
    {
      name: 'Contato',
      href: '#contact'
    }
  ];

  const handleBookingClick = () => {
    navigate('/booking');
    setIsMenuOpen(false);
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-barbershop-dark/95 backdrop-blur-sm border-b border-barbershop-slate">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer min-w-0" onClick={() => navigate('/')}>
            <img 
              alt="Barbearia Logo" 
              className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 object-contain flex-shrink-0" 
              src="/lovable-uploads/b871dc44-8f2d-4ccc-9222-d3c418e1b872.png" 
            />
            <span className="text-base sm:text-xl lg:text-2xl font-oswald font-bold text-barbershop-cream truncate">
              Barbearia BiraShow
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-barbershop-cream hover:text-barbershop-copper transition-colors duration-300 font-medium text-sm xl:text-base"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            {canInstall && (
              <Button 
                onClick={installApp}
                variant="install"
                className="text-sm xl:text-base px-3 xl:px-4" 
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                {isIOS ? 'Instalar' : 'Baixar App'}
              </Button>
            )}
            <Button 
              onClick={handleBookingClick}
              className="copper-gradient text-barbershop-cream font-semibold hover:scale-105 transition-transform text-sm xl:text-base px-4 xl:px-6" 
              size="sm"
            >
              Agendar Horário
            </Button>
          </div>

          {/* Mobile Menu Button and Install Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {canInstall && (
              <Button 
                onClick={installApp}
                variant="install"
                size="sm"
                className="p-2"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
            <button 
              className="p-2 text-barbershop-cream hover:text-barbershop-copper transition-colors touch-manipulation" 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-barbershop-charcoal/85 backdrop-blur-md border-b border-barbershop-slate animate-slide-in-right shadow-xl">
            <nav className="px-4 py-6 space-y-1 max-h-[80vh] overflow-y-auto">
              {/* Mobile CTA primeiro */}
              <div className="pb-4 border-b border-barbershop-slate/30 mb-4">
                <Button 
                  onClick={handleBookingClick}
                  className="w-full copper-gradient text-barbershop-cream font-semibold h-12 text-base"
                >
                  Agendar Horário
                </Button>
              </div>
              
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-4 px-2 text-barbershop-cream hover:text-barbershop-copper hover:bg-barbershop-slate/30 transition-all duration-200 text-base font-medium rounded-lg touch-manipulation"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
