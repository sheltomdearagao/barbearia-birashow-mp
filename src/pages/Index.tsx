import React from 'react';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import ReviewsSection from '@/components/ReviewsSection';
import Footer from '@/components/Footer';
import FloatingActionButtons from '@/components/FloatingActionButtons';
import { Scissors, Zap, Crown, User, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const serviceList = [
  { icon: Zap, title: 'Corte à Máquina', price: 25 },
  { icon: Scissors, title: 'Corte à Tesoura', price: 30 },
  { icon: User, title: 'Barba', price: 20 },
  { icon: Eye, title: 'Sobrancelha', price: 20 },
  { icon: Crown, title: 'Pacote Completo', price: 60 }
];

const Index = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState<string[]>([]);
  const total = selected.reduce((sum, title) => {
    const s = serviceList.find(s => s.title === title);
    return sum + (s ? s.price : 0);
  }, 0);

  const toggleService = (title: string) => {
    setSelected(sel => sel.includes(title) ? sel.filter(t => t !== title) : [...sel, title]);
  };

  return (
    <div className="min-h-screen bg-barbershop-dark">
      <main className="pt-20 sm:pt-24 lg:pt-28">
        <section className="py-8 sm:py-10 bg-barbershop-dark">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-oswald font-bold text-barbershop-cream mb-2">Escolha seus serviços</h2>
              <p className="text-barbershop-cream/70 text-base sm:text-lg">Selecione os serviços desejados para agendar</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mb-4">
              {serviceList.map((service) => (
                <button
                  key={service.title}
                  type="button"
                  onClick={() => toggleService(service.title)}
                  className={`flex flex-col items-center justify-center w-32 h-32 sm:w-36 sm:h-36 rounded-xl border-2 transition-all duration-200 shadow-lg bg-barbershop-slate hover:border-barbershop-copper focus:outline-none focus:ring-2 focus:ring-barbershop-copper
                    ${selected.includes(service.title) ? 'border-barbershop-copper ring-2 ring-barbershop-copper scale-105' : 'border-barbershop-steel'}`}
                >
                  <service.icon className="h-8 w-8 sm:h-10 sm:w-10 text-barbershop-copper mb-2" />
                  <span className="font-bold text-barbershop-cream text-base sm:text-lg mb-1">{service.title}</span>
                  <span className="text-barbershop-copper font-semibold text-lg">R$ {service.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-barbershop-cream/80 text-lg font-semibold">Total: <span className="text-barbershop-copper">R$ {total.toFixed(2)}</span></span>
              <Button
                className="copper-gradient px-8 py-3 text-lg font-bold mt-2 disabled:opacity-50"
                disabled={selected.length === 0}
                onClick={() => navigate('/booking', { state: { selectedServices: selected } })}
              >
                Agendar
              </Button>
            </div>
          </div>
        </section>
        <HeroSection />
        <ServicesSection />
        <ContactSection />
        <ReviewsSection />
      </main>
      <Footer />
      <FloatingActionButtons />
    </div>
  );
};

export default Index;
