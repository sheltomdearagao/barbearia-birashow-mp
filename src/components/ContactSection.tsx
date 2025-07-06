import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock } from 'lucide-react';
import MapComponent from './MapComponent';

const ContactSection = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-barbershop-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-oswald font-bold text-barbershop-cream mb-4 sm:mb-6">
              Nossa Localização
            </h2>
            <p className="text-lg sm:text-xl text-barbershop-cream/80 max-w-3xl mx-auto leading-relaxed px-4">
              Encontre-nos facilmente e confira nossos horários de funcionamento
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
            {/* Hours Card - Novo padrão igual ao do mapa */}
            <div className="relative bg-barbershop-slate border border-barbershop-steel rounded-lg p-4 shadow-lg flex flex-col justify-between h-full">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-barbershop-copper mr-3" />
                <h4 className="text-barbershop-cream font-bold text-lg">Horário de Funcionamento</h4>
              </div>
              <div className="space-y-4 sm:space-y-6 text-barbershop-cream/80 text-base sm:text-lg">
                <div className="flex justify-between items-center py-2 sm:py-3 border-b border-barbershop-steel/30">
                  <span className="font-medium">Terça a Domingo:</span>
                  <span className="font-bold text-barbershop-copper text-sm sm:text-base">9h às 12h | 14h às 21h</span>
                </div>
                <div className="flex justify-between items-center py-2 sm:py-3">
                  <span className="font-medium">Segunda-feira:</span>
                  <span className="text-barbershop-cream/60">Fechado</span>
                </div>
              </div>
            </div>

            {/* Compact Map - sem corte, padding e overflow adequados */}
            <div className="relative bg-barbershop-slate border border-barbershop-steel rounded-lg p-4 shadow-lg flex flex-col justify-between h-full">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-barbershop-copper mr-3" />
                <h4 className="text-barbershop-cream font-bold text-lg">Localização no Mapa</h4>
              </div>
              <div className="w-full rounded-md overflow-hidden border-2 border-barbershop-steel">
                <MapComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
