
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const FloatingActionButtons = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '5571992741864';
    const message = 'Olá! Gostaria de agendar um horário na Barbearia Bira Show.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6 lg:hidden">
      {/* WhatsApp Button */}
      <Button
        onClick={handleWhatsAppClick}
        size="sm"
        className="copper-gradient shadow-2xl hover:scale-110 transition-all duration-300 rounded-full w-12 h-12 sm:w-14 sm:h-14 p-0 touch-manipulation"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
    </div>
  );
};

export default FloatingActionButtons;
