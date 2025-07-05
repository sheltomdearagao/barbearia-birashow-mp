import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Clock, Users, User } from 'lucide-react';
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
        <div className="max-w-5xl mx-auto">
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-oswald font-bold text-barbershop-cream mb-6 sm:mb-8 leading-tight">
            BIRA SHOW
            <span className="block text-transparent bg-gradient-to-r from-barbershop-copper to-barbershop-bronze bg-clip-text">
              Barbearia Raiz
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-barbershop-cream/80 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
            O melhor barbeiro de Salvador agora com atendimento agendado, porque estilo e conforto andam juntos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center mb-12 sm:mb-16 px-4">
            <Button 
              onClick={() => navigate('/booking')} 
              size="lg" 
              className="copper-gradient text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 hover:scale-105 transition-transform shadow-2xl font-semibold"
            >
              Agendar Agora
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            </Button>
            
            <Button 
              onClick={() => navigate('/register')} 
              variant="outline" 
              size="lg" 
              className="border-2 border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-dark text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 transition-all font-semibold"
            >
              <User className="mr-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
              Criar Conta
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-barbershop-cream/30 text-barbershop-cream/80 hover:bg-barbershop-cream/10 hover:text-barbershop-cream text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 transition-all font-semibold" 
              onClick={() => {
                const servicesSection = document.getElementById('services');
                servicesSection?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              Nossos Serviços
            </Button>
          </div>

          {/* Stats - Responsive layout */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 lg:gap-16 xl:gap-20 max-w-5xl mx-auto px-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center flex-1 max-w-[120px] sm:max-w-[140px] lg:max-w-[160px]">
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-barbershop-copper/20 mb-3 sm:mb-4">
                  <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-barbershop-copper" />
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-barbershop-cream mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-barbershop-cream/70 text-xs sm:text-sm lg:text-base">
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
