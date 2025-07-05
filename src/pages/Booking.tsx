import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, Clock, DollarSign, User, Calendar as CalendarIcon, CheckCircle, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Service } from '@/types';
import ProgressBar from '@/components/ProgressBar';

const Booking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Serviços atualizados conforme tabela
  const services: Service[] = [
    {
      id: '1',
      name: 'Corte à Máquina',
      description: 'Corte masculino moderno, realizado com máquina de cortar cabelo para um acabamento preciso e uniforme.',
      price: 25,
      duration_in_minutes: 25
    },
    {
      id: '2',
      name: 'Corte à Tesoura',
      description: 'Corte clássico ou estilizado, feito inteiramente na tesoura para um visual mais texturizado e personalizado.',
      price: 30,
      duration_in_minutes: 35
    },
    {
      id: '3',
      name: 'Barba',
      description: 'Modelagem, aparo e finalização da barba com navalha e produtos específicos para o cuidado da pele e dos pelos.',
      price: 20,
      duration_in_minutes: 20
    },
    {
      id: '4',
      name: 'Sobrancelha',
      description: 'Design e limpeza da sobrancelha, realizado na pinça ou na navalha para realçar o olhar masculino.',
      price: 20,
      duration_in_minutes: 10
    },
    {
      id: '5',
      name: 'Pacote Completo',
      description: 'Serviço completo que inclui o corte de cabelo (máquina ou tesoura), design da barba e limpeza da sobrancelha.',
      price: 60,
      duration_in_minutes: 60
    }
  ];

  // Mock available times
  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleServiceToggle = (service: Service) => {
    setSelectedServices(prev => {
      const exists = prev.find(s => s.id === service.id);
      if (exists) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const getTotalPrice = () => {
    const servicesTotal = selectedServices.reduce((total, service) => total + service.price, 0);
    return servicesTotal + 5; // Taxa de agendamento atualizada
  };

  const getTotalDuration = () => {
    return selectedServices.reduce((total, service) => total + service.duration_in_minutes, 0);
  };

  const steps = [
    { id: 1, title: 'Serviços', icon: CheckCircle },
    { id: 2, title: 'Data & Hora', icon: CalendarIcon },
    { id: 3, title: 'Confirmar', icon: User }
  ];

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-oswald font-bold text-barbershop-cream mb-2">
                Escolha seus Serviços
              </h2>
              <p className="text-barbershop-cream/70">
                Selecione um ou mais serviços
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card 
                  key={service.id}
                  className={`bg-barbershop-slate border-barbershop-steel cursor-pointer transition-all hover:border-barbershop-copper hover:scale-105 ${selectedServices.find(s => s.id === service.id) ? 'ring-2 ring-barbershop-copper bg-barbershop-charcoal' : ''}`}
                  onClick={() => handleServiceToggle(service)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        checked={!!selectedServices.find(s => s.id === service.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-barbershop-cream text-lg">{service.name}</h3>
                          <div className="text-right">
                            <p className="text-barbershop-copper font-bold text-xl">R$ {service.price}</p>
                            <p className="text-xs text-barbershop-cream/60 flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {service.duration_in_minutes}min
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-barbershop-cream/70">{service.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-oswald font-bold text-barbershop-cream mb-2">
                Escolha Data e Horário
              </h2>
              <p className="text-barbershop-cream/70">
                Selecione o dia e horário desejado
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-barbershop-slate border-barbershop-steel">
                <CardHeader>
                  <CardTitle className="text-barbershop-cream flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Data
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
              {selectedDate && (
                <Card className="bg-barbershop-slate border-barbershop-steel">
                  <CardHeader>
                    <CardTitle className="text-barbershop-cream flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Horário
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className={`${selectedTime === time ? "copper-gradient" : "border-barbershop-steel text-barbershop-cream hover:border-barbershop-copper hover:bg-barbershop-copper/10"} h-12 text-base font-medium`}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-oswald font-bold text-barbershop-cream mb-2">
                Confirmação do Agendamento
              </h2>
              <p className="text-barbershop-cream/70">
                Revise os detalhes antes de prosseguir
              </p>
            </div>
            <Card className="bg-barbershop-slate border-barbershop-steel">
              <CardHeader>
                <CardTitle className="text-barbershop-cream flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-barbershop-cream mb-3 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-barbershop-copper" />
                    Serviços Selecionados:
                  </h4>
                  {selectedServices.map((service) => (
                    <div key={service.id} className="flex justify-between py-2 border-b border-barbershop-steel/30">
                      <span className="text-barbershop-cream/80">{service.name}</span>
                      <span className="text-barbershop-cream font-medium">R$ {service.price}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-barbershop-steel pt-4">
                  <div className="flex justify-between py-2">
                    <span className="text-barbershop-cream/80">Data:</span>
                    <span className="text-barbershop-cream font-medium">{selectedDate?.toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-barbershop-cream/80">Horário:</span>
                    <span className="text-barbershop-cream font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-barbershop-cream/80">Duração:</span>
                    <span className="text-barbershop-cream font-medium">{getTotalDuration()} minutos</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-barbershop-cream/80">Profissional:</span>
                    <span className="text-barbershop-copper font-semibold">Bira Show</span>
                  </div>
                </div>
                <div className="border-t border-barbershop-steel pt-4">
                  <div className="flex justify-between py-2">
                    <span className="text-barbershop-cream">Subtotal:</span>
                    <span className="text-barbershop-cream">R$ {selectedServices.reduce((total, s) => total + s.price, 0)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-barbershop-cream">Taxa de agendamento:</span>
                    <span className="text-barbershop-cream">R$ 5</span>
                  </div>
                  <div className="flex justify-between py-3 text-lg font-bold border-t border-barbershop-steel">
                    <span className="text-barbershop-cream">Total:</span>
                    <span className="text-barbershop-copper text-xl">R$ {getTotalPrice()}</span>
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
        return selectedServices.length > 0;
      case 2:
        return selectedDate && selectedTime;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate('/login', { state: { from: '/booking', bookingData: { selectedServices, selectedDate, selectedTime, total: getTotalPrice() } } });
    }
  };

  return (
    <div className="min-h-screen bg-barbershop-dark pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/')}
            className="text-barbershop-cream hover:text-barbershop-copper"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
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
          <div className="md:hidden flex items-center space-x-2">
            {[1, 2, 3].map((i) => (
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
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {renderStepContent()}
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="bg-barbershop-charcoal border-barbershop-copper">
                  <CardHeader>
                    <CardTitle className="text-barbershop-cream flex items-center">
                      <DollarSign className="h-5 w-5 mr-2" />
                      Resumo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedServices.length > 0 ? (
                      <>
                        <div>
                          <h4 className="font-semibold text-barbershop-cream mb-2">Serviços:</h4>
                          {selectedServices.map((service) => (
                            <div key={service.id} className="flex justify-between py-1 text-sm">
                              <span className="text-barbershop-cream/80">{service.name}</span>
                              <span className="text-barbershop-cream">R$ {service.price}</span>
                            </div>
                          ))}
                        </div>
                        {selectedDate && (
                          <div className="border-t border-barbershop-steel pt-3">
                            <div className="flex justify-between py-1 text-sm">
                              <span className="text-barbershop-cream/80">Data:</span>
                              <span className="text-barbershop-cream">{selectedDate.toLocaleDateString('pt-BR')}</span>
                            </div>
                            {selectedTime && (
                              <div className="flex justify-between py-1 text-sm">
                                <span className="text-barbershop-cream/80">Horário:</span>
                                <span className="text-barbershop-cream">{selectedTime}</span>
                              </div>
                            )}
                            <div className="flex justify-between py-1 text-sm">
                              <span className="text-barbershop-cream/80">Profissional:</span>
                              <span className="text-barbershop-copper font-semibold">Bira Show</span>
                            </div>
                          </div>
                        )}
                        <div className="border-t border-barbershop-steel pt-3">
                          <div className="flex justify-between py-1">
                            <span className="text-barbershop-cream">Subtotal:</span>
                            <span className="text-barbershop-cream">R$ {selectedServices.reduce((total, s) => total + s.price, 0)}</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-barbershop-cream">Taxa:</span>
                            <span className="text-barbershop-cream">R$ 5</span>
                          </div>
                          <div className="flex justify-between py-2 text-lg font-bold border-t border-barbershop-steel">
                            <span className="text-barbershop-cream">Total:</span>
                            <span className="text-barbershop-copper">R$ {getTotalPrice()}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-barbershop-cream/60 text-center py-4">
                        Selecione pelo menos um serviço
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
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
              className="copper-gradient px-8"
              size="lg"
            >
              {step === 3 ? 'Fazer Login e Pagar' : 'Continuar'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
