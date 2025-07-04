import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Scissors, Zap, Crown, Clock, DollarSign } from 'lucide-react';
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
          <span className="bg-barbershop-copper text-barbershop-dark px-4 py-1 rounded-full text-sm font-semibold">
            Mais Popular
          </span>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full copper-gradient mb-4 mx-auto">
          <service.icon className="h-8 w-8 text-barbershop-cream" />
        </div>
        <CardTitle className="text-2xl font-oswald text-barbershop-cream mb-2">
          {service.title}
        </CardTitle>
        <CardDescription className="text-barbershop-cream/70">
          {service.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col flex-grow space-y-4">
        <div className="flex justify-between items-center p-3 bg-barbershop-charcoal rounded-lg">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-barbershop-copper" />
            {/* 4. Formatando o preço na renderização */}
            <span className="text-2xl font-bold text-barbershop-copper">{`R$ ${service.price}`}</span>
          </div>
          <div className="flex items-center space-x-2 text-barbershop-cream/70">
            <Clock className="h-4 w-4" />
             {/* 4. Formatando a duração na renderização */}
            <span>{`${service.duration} min`}</span>
          </div>
        </div>

        <ul className="space-y-2 flex-grow">
          {service.features.map((feature) => (
             // 3. Usando 'feature' como chave, assumindo que são únicos por serviço
            <li key={feature} className="flex items-center text-barbershop-cream/80">
              <div className="w-2 h-2 bg-barbershop-copper rounded-full mr-3 flex-shrink-0"></div>
              {feature}
            </li>
          ))}
        </ul>
        
        <Button
          onClick={() => navigate('/booking')}
          className={`w-full mt-auto ${ // mt-auto para alinhar o botão na parte inferior
            service.popular
              ? 'copper-gradient'
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
      icon: Scissors,
      title: 'Corte Clássico',
      description: 'Corte tradicional com tesoura e navalha, finalizado com produtos premium',
      price: 45,
      duration: 45,
      features: ['Lavagem', 'Corte personalizado', 'Finalização', 'Produtos premium']
    },
    {
      icon: Zap,
      title: 'Barba Tradicional',
      description: 'Aparado e modelagem com navalha tradicional e toalhas quentes',
      price: 35,
      duration: 30,
      features: ['Toalha quente', 'Navalha tradicional', 'Óleos especiais', 'Pós-barba']
    },
    {
      icon: Crown,
      title: 'O Ritual Completo',
      description: 'Experiência premium: corte + barba + tratamentos especiais',
      price: 75,
      duration: 75,
      features: ['Corte + Barba', 'Massagem relaxante', 'Tratamento facial', 'Bebida cortesia'],
      popular: true
    }
  ];

  return (
    <section id="services" className="py-20 bg-barbershop-charcoal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-oswald font-bold text-barbershop-cream mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-barbershop-cream/80 max-w-2xl mx-auto">
            Cada serviço é uma experiência única, executada com maestria e atenção aos detalhes
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
