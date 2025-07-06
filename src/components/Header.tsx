import React, { useState } from 'react';
import { Menu, X, Download, User, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { usePWA } from '@/hooks/usePWA';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { installApp, canInstall, isIOS } = usePWA();
  const { isAuthenticated, signOut } = useAuth();

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
      name: 'Contato',
      href: '#contact'
    }
  ];

  const handleBookingClick = () => {
    navigate('/booking');
    setIsMenuOpen(false);
  };

  const handleRegisterClick = () => {
    navigate('/register');
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
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
            
            {isAuthenticated ? (
              // Usuário logado
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline"
                    className="border-2 border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-dark font-semibold transition-all text-sm xl:text-base px-4 xl:px-6" 
                    size="sm"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Minha Conta
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-barbershop-slate border-barbershop-steel">
                  <DropdownMenuItem 
                    onClick={handleProfileClick}
                    className="text-barbershop-cream hover:bg-barbershop-charcoal cursor-pointer"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Meu Perfil
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-barbershop-steel" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-400 hover:bg-red-500/10 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Usuário não logado
              <>
                <Button 
                  onClick={handleLoginClick}
                  variant="outline"
                  className="border-2 border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-dark font-semibold transition-all text-sm xl:text-base px-4 xl:px-6" 
                  size="sm"
                >
                  <User className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
                <Button 
                  onClick={handleRegisterClick}
                  variant="outline"
                  className="border-2 border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-dark font-semibold transition-all text-sm xl:text-base px-4 xl:px-6" 
                  size="sm"
                >
                  <User className="h-4 w-4 mr-2" />
                  Criar Conta
                </Button>
              </>
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
              <div className="pb-4 border-b border-barbershop-slate/30 mb-4 space-y-3">
                {isAuthenticated ? (
                  // Usuário logado - mobile
                  <>
                    <Button 
                      onClick={handleProfileClick}
                      variant="outline"
                      className="w-full border-2 border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-dark font-semibold h-12 text-base"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Meu Perfil
                    </Button>
                    <Button 
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-barbershop-dark font-semibold h-12 text-base"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  // Usuário não logado - mobile
                  <>
                    <Button 
                      onClick={handleLoginClick}
                      variant="outline"
                      className="w-full border-2 border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-dark font-semibold h-12 text-base"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Entrar
                    </Button>
                    <Button 
                      onClick={handleRegisterClick}
                      variant="outline"
                      className="w-full border-2 border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-dark font-semibold h-12 text-base"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Criar Conta
                    </Button>
                  </>
                )}
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
