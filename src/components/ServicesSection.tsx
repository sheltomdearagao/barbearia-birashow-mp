import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Scissors, Zap, Crown, Clock, DollarSign, User, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 1. Definindo um tipo explícito para o serviço para melhor legibilidade e reutilização
type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  price: number; // Alterado para número
  duration: number; // Alterado para número
  features: string[];
  popular?: boolean; // A propriedade 'popular' é opcional
};

// 2. Movendo o ServiceCard para fora do componente ServicesSection para evitar recriações
//    e usando o tipo 'Service' que acabamos de criar.
const ServiceCard = ({ service }: { service: Service }) => {
  // O hook 'useNavigate' precisa ser chamado no componente que está dentro do Router,
  // então vamos passá-lo como prop ou chamar no componente pai.
  // Para este caso, o mais simples é manter o navigate no componente pai.
  const navigate = useNavigate();

  return (
    <Card
      className={`flex flex-col h-full bg-barbershop-slate border-barbershop-steel hover:border-barbershop-copper transition-all duration-300 hover:scale-105 ${
        service.popular ? 'ring-2 ring-barbershop-copper relative' : ''
      }`}
    >
      {service.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <span className="bg-barbershop-copper text-barbershop-dark px-3 py-1 rounded-full text-xs font-semibold">
            Mais Popular
          </span>
        </div>
      )}
      
      <CardHeader className="text-center pb-4 sm:pb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full copper-gradient mb-4 sm:mb-6 mx-auto">
          <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-barbershop-cream" />
        </div>
        <CardTitle className="text-xl sm:text-2xl font-oswald font-bold text-barbershop-cream mb-2 sm:mb-3">
          {service.title}
        </CardTitle>
        <CardDescription className="text-barbershop-cream/70 text-sm sm:text-base leading-relaxed">
          {service.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col flex-grow space-y-4 sm:space-y-6">
        <div className="flex justify-between items-center p-3 sm:p-4 bg-barbershop-charcoal rounded-lg">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-barbershop-copper" />
            {/* 4. Formatando o preço na renderização */}
            <span className="text-xl sm:text-2xl font-bold text-barbershop-copper">{`R$ ${service.price.toFixed(2)}`}</span>
          </div>
          <div className="flex items-center space-x-2 text-barbershop-cream/70">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
             {/* 4. Formatando a duração na renderização */}
            <span className="text-xs sm:text-sm">{`${service.duration} min`}</span>
          </div>
        </div>

        <ul className="space-y-2 sm:space-y-3 flex-grow">
          {service.features.map((feature) => (
             // 3. Usando 'feature' como chave, assumindo que são únicos por serviço
            <li key={feature} className="flex items-center text-barbershop-cream/80 text-xs sm:text-sm">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-barbershop-copper rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
              {feature}
            </li>
          ))}
        </ul>
        
        <Button
          onClick={() => navigate('/booking')}
          className={`w-full mt-auto h-10 sm:h-12 text-sm sm:text-base font-semibold ${ // mt-auto para alinhar o botão na parte inferior
            service.popular
              ? 'copper-gradient hover:scale-105'
              : 'bg-barbershop-charcoal hover:bg-barbershop-copper border border-barbershop-steel hover:border-barbershop-copper text-barbershop-cream hover:text-barbershop-dark'
          } transition-all`}
          size="lg"
        >
          Agendar {service.title}
        </Button>
      </CardContent>
    </Card>
  );
};


const ServicesSection = () => {
  const navigate = useNavigate();

  // Usando o tipo 'Service' para garantir que os dados estão corretos
  const services: Service[] = [
    {
      icon: Zap,
      title: 'Corte à Máquina',
      description: 'Corte masculino moderno, realizado com máquina de cortar cabelo para um acabamento preciso e uniforme.',
      price: 25,
      duration: 25,
      features: ['Acabamento preciso', 'Uniformidade', 'Rápido']
    },
    {
      icon: Scissors,
      title: 'Corte à Tesoura',
      description: 'Corte clássico ou estilizado, feito inteiramente na tesoura para um visual mais texturizado e personalizado.',
      price: 30,
      duration: 35,
      features: ['Corte personalizado', 'Texturização', 'Estilo clássico ou moderno']
    },
    {
      icon: User,
      title: 'Barba',
      description: 'Modelagem, aparo e finalização da barba com navalha e produtos específicos para o cuidado da pele e dos pelos.',
      price: 20,
      duration: 20,
      features: ['Navalha tradicional', 'Produtos especiais', 'Cuidado com a pele']
    },
    {
      icon: Eye,
      title: 'Sobrancelha',
      description: 'Design e limpeza da sobrancelha, realizado na pinça ou na navalha para realçar o olhar masculino.',
      price: 20,
      duration: 10,
      features: ['Design masculino', 'Limpeza precisa', 'Pinça ou navalha']
    },
    {
      icon: Crown,
      title: 'Pacote Completo',
      description: 'Serviço completo que inclui o corte de cabelo (máquina ou tesoura), design da barba e limpeza da sobrancelha.',
      price: 60,
      duration: 60,
      features: ['Corte + Barba + Sobrancelha', 'Atendimento completo', 'Visual renovado'],
      popular: true
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-barbershop-charcoal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-oswald font-bold text-barbershop-cream mb-4 sm:mb-6">
            Nossos Serviços
          </h2>
          <p className="text-lg sm:text-xl text-barbershop-cream/80 max-w-3xl mx-auto leading-relaxed px-4">
            Cada serviço é uma experiência única, executada com maestria e atenção aos detalhes
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 max-w-7xl mx-auto">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {services.map((service) => (
                <CarouselItem key={service.title}>
                  <div className="p-1">
                    <ServiceCard service={service} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-cream" />
            <CarouselNext className="border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-cream" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
