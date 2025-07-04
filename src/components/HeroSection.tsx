
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const stats = [{
    icon: Star,
    value: '4.9',
    label: 'Avaliação'
  }, {
    icon: Clock,
    value: '15+',
    label: 'Anos de Experiência'
  }, {
    icon: Users,
    value: '5000+',
    label: 'Clientes Satisfeitos'
  }];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-barbershop-dark via-barbershop-charcoal to-barbershop-slate">
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-4xl lg:text-7xl font-oswald font-bold text-barbershop-cream mb-6 leading-tight">
            BIRA SHOW
            <span className="block text-transparent bg-gradient-to-r from-barbershop-copper to-barbershop-bronze bg-clip-text">
              Barbearia Raiz
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-barbershop-cream/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            O melhor barbeiro de Salvador agora com atendimento agendado, porque estilo e conforto andam juntos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button onClick={() => navigate('/booking')} size="lg" className="copper-gradient text-lg px-8 py-4 hover:scale-105 transition-transform shadow-2xl">
              Agendar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button variant="outline" size="lg" className="border-2 border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-dark text-lg px-8 py-4 transition-all" onClick={() => {
            const servicesSection = document.getElementById('services');
            servicesSection?.scrollIntoView({
              behavior: 'smooth'
            });
          }}>
              Nossos Serviços
            </Button>
          </div>

          {/* Stats - Now horizontal on all screens */}
          <div className="flex flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-16 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center flex-1 max-w-[120px]">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-barbershop-copper/20 mb-3">
                  <stat.icon className="h-6 w-6 text-barbershop-copper" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-barbershop-cream mb-1">
                  {stat.value}
                </div>
                <div className="text-barbershop-cream/70 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
