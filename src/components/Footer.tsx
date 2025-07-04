import React from 'react';
import { Phone } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-barbershop-dark border-t border-barbershop-steel">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Logo and Description */}
          <div>
            <h3 className="text-2xl font-oswald font-bold text-barbershop-cream mb-4">
              Barbearia Bira Show
            </h3>
            <p className="text-barbershop-cream/80 mb-6 max-w-md">
              Tradição e estilo com o melhor de Salvador.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-lg font-semibold text-barbershop-cream mb-2">Links Úteis</h4>
            <a 
              href="/terms" 
              className="text-barbershop-cream/80 hover:text-barbershop-copper transition-colors duration-300 text-sm"
            >
              Termos de Uso
            </a>
            <a 
              href="/privacy" 
              className="text-barbershop-cream/80 hover:text-barbershop-copper transition-colors duration-300 text-sm"
            >
              Política de Privacidade
            </a>
          </div>
        </div>

        <div className="border-t border-barbershop-steel mt-8 pt-8 text-center">
          <p className="text-barbershop-cream/60 text-sm">
            © 2025 Barbearia Bira Show. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;