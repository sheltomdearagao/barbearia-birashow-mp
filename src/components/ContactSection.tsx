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
            {/* Hours Card - Larger */}
            <Card className="bg-barbershop-slate border-barbershop-steel">
              <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-barbershop-cream flex items-center text-lg sm:text-xl lg:text-2xl font-bold">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-barbershop-copper flex-shrink-0" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
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
              </CardContent>
            </Card>

            {/* Compact Map */}
            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-barbershop-cream flex items-center">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-barbershop-copper" />
                Localização no Mapa
              </h4>
              <div className="h-48 sm:h-64 lg:h-80 rounded-lg overflow-hidden border border-barbershop-steel">
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
