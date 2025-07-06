import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, Clock, DollarSign, User, Calendar as CalendarIcon, CheckCircle, Sun, Moon, Coffee } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Service } from '@/types';
import ProgressBar from '@/components/ProgressBar';

// Definição dos turnos
const turnos = [
  { id: 'manha', nome: 'Manhã', horario: '09:00 às 12:00', icon: Sun, color: 'text-yellow-500' },
  { id: 'tarde', nome: 'Tarde', horario: '14:00 às 18:00', icon: Coffee, color: 'text-orange-500' },
  { id: 'noite', nome: 'Noite', horario: '18:00 às 21:00', icon: Moon, color: 'text-blue-500' }
];

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTurno, setSelectedTurno] = useState<string>('');
  const [turnoCounts, setTurnoCounts] = useState<{[key: string]: number}>({
    manha: 0,
    tarde: 0,
    noite: 0
  });

  // Receber serviços selecionados da home
  useEffect(() => {
    const servicesFromHome = location.state?.selectedServices;
    if (servicesFromHome && servicesFromHome.length > 0) {
      // Mapear nomes dos serviços para objetos Service
      const servicesMap: {[key: string]: Service} = {
        'Corte à Máquina': { id: '1', name: 'Corte à Máquina', description: '', price: 25, duration_in_minutes: 25 },
        'Corte à Tesoura': { id: '2', name: 'Corte à Tesoura', description: '', price: 30, duration_in_minutes: 35 },
        'Barba': { id: '3', name: 'Barba', description: '', price: 20, duration_in_minutes: 20 },
        'Sobrancelha': { id: '4', name: 'Sobrancelha', description: '', price: 20, duration_in_minutes: 10 },
        'Pacote Completo': { id: '5', name: 'Pacote Completo', description: '', price: 60, duration_in_minutes: 60 }
      };
      
      const services = servicesFromHome.map((serviceName: string) => servicesMap[serviceName]).filter(Boolean);
      setSelectedServices(services);
    }
  }, [location.state]);

  // Simular contagem de agendamentos por turno (mock data)
  useEffect(() => {
    if (selectedDate) {
      // Mock: simular contagem baseada no dia da semana
      const dayOfWeek = selectedDate.getDay();
      setTurnoCounts({
        manha: Math.floor(Math.random() * 5) + 1,
        tarde: Math.floor(Math.random() * 8) + 2,
        noite: Math.floor(Math.random() * 6) + 1
      });
    }
  }, [selectedDate]);

  const getTotalPrice = () => {
    const servicesTotal = selectedServices.reduce((total, service) => total + service.price, 0);
    return servicesTotal + 5; // Taxa de agendamento
  };

  const getTotalDuration = () => {
    return selectedServices.reduce((total, service) => total + service.duration_in_minutes, 0);
  };

  const steps = [
    { id: 1, title: 'Data & Turno', icon: CalendarIcon },
    { id: 2, title: 'Confirmar', icon: User }
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-oswald font-bold text-barbershop-cream mb-4">
                Escolha Data e Turno
              </h2>
              <p className="text-lg text-barbershop-cream/70">
                Selecione o dia e o turno desejado para seu agendamento
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Seleção de Data */}
              <Card className="bg-barbershop-slate border-barbershop-steel">
                <CardHeader>
                  <CardTitle className="text-xl text-barbershop-cream flex items-center">
                    <CalendarIcon className="h-6 w-6 mr-3 text-barbershop-copper" />
                    Escolha a Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border-0"
                  />
                </CardContent>
              </Card>

              {/* Seleção de Turno */}
              {selectedDate && (
                <Card className="bg-barbershop-slate border-barbershop-steel">
                  <CardHeader>
                    <CardTitle className="text-xl text-barbershop-cream flex items-center">
                      <Clock className="h-6 w-6 mr-3 text-barbershop-copper" />
                      Escolha o Turno
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {turnos.map((turno) => {
                        const IconComponent = turno.icon;
                        const isSelected = selectedTurno === turno.id;
                        const count = turnoCounts[turno.id];
                        
                        return (
                          <button
                            key={turno.id}
                            onClick={() => setSelectedTurno(turno.id)}
                            className={`w-full p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                              isSelected 
                                ? 'border-barbershop-copper bg-barbershop-copper/10 ring-2 ring-barbershop-copper' 
                                : 'border-barbershop-steel hover:border-barbershop-copper/50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <IconComponent className={`h-8 w-8 ${turno.color}`} />
                                <div className="text-left">
                                  <h3 className="text-lg font-bold text-barbershop-cream">{turno.nome}</h3>
                                  <p className="text-sm text-barbershop-cream/70">{turno.horario}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-barbershop-copper">{count}</div>
                                <div className="text-xs text-barbershop-cream/60">agendados</div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-oswald font-bold text-barbershop-cream mb-4">
                Confirmação do Agendamento
              </h2>
              <p className="text-lg text-barbershop-cream/70">
                Revise os detalhes antes de prosseguir
              </p>
            </div>

            <Card className="bg-barbershop-slate border-barbershop-steel">
              <CardHeader>
                <CardTitle className="text-xl text-barbershop-cream flex items-center">
                  <DollarSign className="h-6 w-6 mr-3 text-barbershop-copper" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Serviços Selecionados */}
                <div>
                  <h4 className="font-semibold text-lg text-barbershop-cream mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-barbershop-copper" />
                    Serviços Selecionados:
                  </h4>
                  {selectedServices.map((service) => (
                    <div key={service.id} className="flex justify-between py-3 border-b border-barbershop-steel/30">
                      <span className="text-barbershop-cream/80">{service.name}</span>
                      <span className="text-barbershop-cream font-medium">R$ {service.price}</span>
                    </div>
                  ))}
                </div>

                {/* Detalhes do Agendamento */}
                <div className="border-t border-barbershop-steel pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-barbershop-cream/80">Data:</span>
                      <span className="text-barbershop-cream font-medium">{selectedDate?.toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-barbershop-cream/80">Turno:</span>
                      <span className="text-barbershop-cream font-medium">
                        {turnos.find(t => t.id === selectedTurno)?.nome} ({turnos.find(t => t.id === selectedTurno)?.horario})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-barbershop-cream/80">Duração:</span>
                      <span className="text-barbershop-cream font-medium">{getTotalDuration()} minutos</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-barbershop-cream/80">Profissional:</span>
                      <span className="text-barbershop-copper font-semibold">Bira Show</span>
                    </div>
                  </div>
                </div>

                {/* Valores */}
                <div className="border-t border-barbershop-steel pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-barbershop-cream">Subtotal:</span>
                      <span className="text-barbershop-cream">R$ {selectedServices.reduce((total, s) => total + s.price, 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-barbershop-cream">Taxa de agendamento:</span>
                      <span className="text-barbershop-cream">R$ 5</span>
                    </div>
                    <div className="flex justify-between py-3 text-xl font-bold border-t border-barbershop-steel">
                      <span className="text-barbershop-cream">Total:</span>
                      <span className="text-barbershop-copper text-2xl">R$ {getTotalPrice()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceedToNextStep = () => {
    switch (step) {
      case 1:
        return selectedDate && selectedTurno;
      case 2:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      navigate('/login', { 
        state: { 
          from: '/booking', 
          bookingData: { 
            selectedServices, 
            selectedDate, 
            selectedTurno, 
            total: getTotalPrice() 
          } 
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-barbershop-dark pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header com navegação */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/')}
            className="text-barbershop-cream hover:text-barbershop-copper"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          
          {/* Progress Bar */}
          <div className="hidden md:flex">
            <ProgressBar
              steps={steps.map((stepItem) => ({
                id: stepItem.id,
                title: stepItem.title,
                completed: stepItem.id < step,
                current: stepItem.id === step
              }))}
            />
          </div>
          
          {/* Mobile Progress */}
          <div className="md:hidden flex items-center space-x-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  i === step
                    ? 'copper-gradient text-barbershop-cream'
                    : i < step
                    ? 'bg-barbershop-copper text-barbershop-cream'
                    : 'bg-barbershop-steel text-barbershop-cream/60'
                }`}
              >
                {i}
              </div>
            ))}
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-2">
              {renderStepContent()}
            </div>

            {/* Sidebar com Resumo */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="bg-barbershop-charcoal border-barbershop-copper">
                  <CardHeader>
                    <CardTitle className="text-xl text-barbershop-cream flex items-center">
                      <DollarSign className="h-6 w-6 mr-3" />
                      Resumo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedServices.length > 0 ? (
                      <>
                        {/* Serviços */}
                        <div>
                          <h4 className="font-semibold text-barbershop-cream mb-3">Serviços:</h4>
                          {selectedServices.map((service) => (
                            <div key={service.id} className="flex justify-between py-1 text-sm">
                              <span className="text-barbershop-cream/80">{service.name}</span>
                              <span className="text-barbershop-cream">R$ {service.price}</span>
                            </div>
                          ))}
                        </div>

                        {/* Data e Turno */}
                        {selectedDate && (
                          <div className="border-t border-barbershop-steel pt-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-barbershop-cream/80">Data:</span>
                                <span className="text-barbershop-cream">{selectedDate.toLocaleDateString('pt-BR')}</span>
                              </div>
                              {selectedTurno && (
                                <div className="flex justify-between text-sm">
                                  <span className="text-barbershop-cream/80">Turno:</span>
                                  <span className="text-barbershop-cream">{turnos.find(t => t.id === selectedTurno)?.nome}</span>
                                </div>
                              )}
                              <div className="flex justify-between text-sm">
                                <span className="text-barbershop-cream/80">Profissional:</span>
                                <span className="text-barbershop-copper font-semibold">Bira Show</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Valores */}
                        <div className="border-t border-barbershop-steel pt-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-barbershop-cream">Subtotal:</span>
                              <span className="text-barbershop-cream">R$ {selectedServices.reduce((total, s) => total + s.price, 0)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-barbershop-cream">Taxa:</span>
                              <span className="text-barbershop-cream">R$ 5</span>
                            </div>
                            <div className="flex justify-between py-2 text-lg font-bold border-t border-barbershop-steel">
                              <span className="text-barbershop-cream">Total:</span>
                              <span className="text-barbershop-copper">R$ {getTotalPrice()}</span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-barbershop-cream/60 text-center py-4">
                        Nenhum serviço selecionado
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Botões de Navegação */}
          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={() => navigate('/register')}
              variant="outline"
              className="border-2 border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-dark"
            >
              <User className="h-4 w-4 mr-2" />
              Criar Conta
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceedToNextStep()}
              className="copper-gradient px-8 py-3 text-lg font-bold"
              size="lg"
            >
              {step === 2 ? 'Fazer Login e Pagar' : 'Continuar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
