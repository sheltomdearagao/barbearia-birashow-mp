import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-barbershop-dark border-t border-barbershop-steel">
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-oswald font-bold text-barbershop-cream mb-4 sm:mb-6">
              Barbearia Bira Show
            </h3>
            <p className="text-barbershop-cream/80 mb-6 sm:mb-8 max-w-2xl text-base sm:text-lg leading-relaxed">
              Tradição e estilo com o melhor de Salvador. Mais de 15 anos de experiência 
              proporcionando o melhor atendimento e qualidade em cada serviço.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-barbershop-copper flex-shrink-0" />
                <span className="text-barbershop-cream/80 text-sm sm:text-base">(71) 99274-1864</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-barbershop-copper flex-shrink-0" />
                <span className="text-barbershop-cream/80 text-sm sm:text-base">Salvador, Bahia</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-lg sm:text-xl font-bold text-barbershop-cream mb-3 sm:mb-4">Links Úteis</h4>
            <div className="space-y-2 sm:space-y-3">
              <a 
                href="/terms" 
                className="block text-barbershop-cream/80 hover:text-barbershop-copper transition-colors duration-300 text-sm sm:text-base"
              >
                Termos de Uso
              </a>
              <a 
                href="/privacy" 
                className="block text-barbershop-cream/80 hover:text-barbershop-copper transition-colors duration-300 text-sm sm:text-base"
              >
                Política de Privacidade
              </a>
              <a 
                href="/booking" 
                className="block text-barbershop-cream/80 hover:text-barbershop-copper transition-colors duration-300 text-sm sm:text-base"
              >
                Agendar Horário
              </a>
              <a 
                href="/register" 
                className="block text-barbershop-cream/80 hover:text-barbershop-copper transition-colors duration-300 text-sm sm:text-base"
              >
                Criar Conta
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-barbershop-steel pt-6 sm:pt-8 text-center">
          <p className="text-barbershop-cream/60 text-sm sm:text-base">
            © 2025 Barbearia Bira Show. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;