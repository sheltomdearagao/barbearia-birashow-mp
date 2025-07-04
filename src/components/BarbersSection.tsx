
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, Award, Users } from 'lucide-react';

const BarbersSection = () => {
  const barbers = [{
    name: 'Ricardo Santos',
    title: 'Mestre Barbeiro & Fundador',
    experience: '15 anos',
    specialties: ['Cortes Clássicos', 'Barbas Tradicionais', 'Estilos Vintage'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 5.0,
    clients: '2000+',
    bio: 'Formado pela tradicional escola italiana de barbeiros, Ricardo trouxe técnicas clássicas para o Brasil.',
    featured: true
  }, {
    name: 'Carlos Medina',
    title: 'Especialista em Cortes Modernos',
    experience: '8 anos',
    specialties: ['Fade', 'Undercut', 'Estilos Contemporâneos'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    clients: '1200+',
    bio: 'Especialista em tendências atuais, Carlos combina técnicas modernas com o cuidado tradicional.'
  }, {
    name: 'Miguel Ferreira',
    title: 'Artista da Navalha',
    experience: '12 anos',
    specialties: ['Barbas Artísticas', 'Navalha Tradicional', 'Design Facial'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    clients: '1800+',
    bio: 'Verdadeiro artista da navalha, Miguel transforma barbas em obras de arte com precisão cirúrgica.'
  }];

  const BarberCard = ({
    barber,
    index
  }: {
    barber: typeof barbers[0];
    index: number;
  }) => (
    <Card className={`bg-barbershop-charcoal border-barbershop-steel hover:border-barbershop-copper transition-all duration-300 hover:scale-105 ${barber.featured ? 'ring-2 ring-barbershop-copper' : ''}`}>
      <CardContent className="p-0 relative">
        {/* Featured Badge */}
        {barber.featured && (
          <div className="absolute top-4 left-4 z-10 bg-barbershop-copper text-barbershop-cream text-sm font-semibold px-3 py-1 rounded-full">
            Fundador
          </div>
        )}

        {/* Image */}
        <div className="relative h-64 lg:h-80 overflow-hidden rounded-t-lg">
          <img src={barber.image} alt={barber.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-barbershop-dark/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Name & Title */}
          <h3 className="text-xl lg:text-2xl font-oswald font-bold text-barbershop-cream mb-1">
            {barber.name}
          </h3>
          <p className="text-barbershop-copper font-medium mb-3">
            {barber.title}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <div className="flex items-center space-x-1">
              <Award className="h-4 w-4 text-barbershop-copper" />
              <span className="text-barbershop-cream/80">{barber.experience}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-barbershop-copper" />
              <span className="text-barbershop-cream/80">{barber.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-barbershop-copper" />
              <span className="text-barbershop-cream/80">{barber.clients}</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-barbershop-cream/80 text-sm mb-4 leading-relaxed">
            {barber.bio}
          </p>

          {/* Specialties */}
          <div className="mb-6">
            <p className="text-barbershop-cream font-medium mb-2 text-sm">Especialidades:</p>
            <div className="flex flex-wrap gap-2">
              {barber.specialties.map((specialty, idx) => (
                <span key={idx} className="px-2 py-1 bg-barbershop-slate text-barbershop-cream text-xs rounded-full">
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button 
            className={`w-full ${barber.featured ? 'copper-gradient' : 'border border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-cream'} transition-all`} 
            variant={barber.featured ? 'default' : 'outline'}
          >
            Agendar com {barber.name.split(' ')[0]}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="barbers" className="py-12 sm:py-16 lg:py-20 bg-barbershop-charcoal">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-oswald font-bold text-barbershop-cream mb-4">
              Nossos Profissionais
            </h2>
            <p className="text-lg sm:text-xl text-barbershop-cream/80 max-w-2xl mx-auto">
              Conheça nossa equipe de mestres barbeiros, cada um especializado em diferentes técnicas e estilos
            </p>
          </div>

          {/* Mobile Carousel */}
          <div className="block lg:hidden">
            <Carousel className="w-full max-w-sm mx-auto">
              <CarouselContent>
                {barbers.map((barber, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <BarberCard barber={barber} index={index} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
            {barbers.map((barber, index) => (
              <BarberCard key={index} barber={barber} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BarbersSection;
