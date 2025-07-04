
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, Clock, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Service } from '@/types';

const Booking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Mock services data
  const services: Service[] = [
    {
      id: '1',
      name: 'Corte Clássico',
      description: 'Corte tradicional com tesoura e navalha',
      price: 45,
      duration_in_minutes: 45
    },
    {
      id: '2',
      name: 'Barba Tradicional',
      description: 'Aparado e modelagem com navalha tradicional',
      price: 35,
      duration_in_minutes: 30
    },
    {
      id: '3',
      name: 'O Ritual Completo',
      description: 'Corte + Barba + Tratamentos especiais',
      price: 75,
      duration_in_minutes: 75
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
    return servicesTotal + 10; // Booking fee
  };

  const getTotalDuration = () => {
    return selectedServices.reduce((total, service) => total + service.duration_in_minutes, 0);
  };

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

            <div className="space-y-4">
              {services.map((service) => (
                <Card 
                  key={service.id}
                  className={`bg-barbershop-slate border-barbershop-steel cursor-pointer transition-all hover:border-barbershop-copper ${
                    selectedServices.find(s => s.id === service.id) ? 'ring-2 ring-barbershop-copper' : ''
                  }`}
                  onClick={() => handleServiceToggle(service)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        checked={!!selectedServices.find(s => s.id === service.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-barbershop-cream">{service.name}</h3>
                          <div className="text-right">
                            <p className="text-barbershop-copper font-semibold">R$ {service.price}</p>
                            <p className="text-xs text-barbershop-cream/60 flex items-center">
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

            {selectedServices.length > 0 && (
              <Card className="bg-barbershop-charcoal border-barbershop-copper">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-barbershop-cream">Serviços:</span>
                    <span className="text-barbershop-cream">R$ {selectedServices.reduce((total, s) => total + s.price, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-barbershop-cream">Taxa de agendamento:</span>
                    <span className="text-barbershop-cream">R$ 10</span>
                  </div>
                  <div className="border-t border-barbershop-steel pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-barbershop-cream">Total:</span>
                      <span className="font-semibold text-barbershop-copper">R$ {getTotalPrice()}</span>
                    </div>
                    <p className="text-xs text-barbershop-cream/60 mt-1">
                      Duração total: {getTotalDuration()} minutos
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
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
                  <CardTitle className="text-barbershop-cream">Data</CardTitle>
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
                    <CardTitle className="text-barbershop-cream">Horário</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className={selectedTime === time ? "copper-gradient" : "border-barbershop-steel text-barbershop-cream hover:border-barbershop-copper"}
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
                  <h4 className="font-semibold text-barbershop-cream mb-2">Serviços Selecionados:</h4>
                  {selectedServices.map((service) => (
                    <div key={service.id} className="flex justify-between py-1">
                      <span className="text-barbershop-cream/80">{service.name}</span>
                      <span className="text-barbershop-cream">R$ {service.price}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-barbershop-steel pt-3">
                  <div className="flex justify-between py-1">
                    <span className="text-barbershop-cream/80">Data:</span>
                    <span className="text-barbershop-cream">{selectedDate?.toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-barbershop-cream/80">Horário:</span>
                    <span className="text-barbershop-cream">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-barbershop-cream/80">Duração:</span>
                    <span className="text-barbershop-cream">{getTotalDuration()} minutos</span>
                  </div>
                </div>

                <div className="border-t border-barbershop-steel pt-3">
                  <div className="flex justify-between py-1">
                    <span className="text-barbershop-cream">Subtotal:</span>
                    <span className="text-barbershop-cream">R$ {selectedServices.reduce((total, s) => total + s.price, 0)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-barbershop-cream">Taxa de agendamento:</span>
                    <span className="text-barbershop-cream">R$ 10</span>
                  </div>
                  <div className="flex justify-between py-2 text-lg font-semibold border-t border-barbershop-steel">
                    <span className="text-barbershop-cream">Total:</span>
                    <span className="text-barbershop-copper">R$ {getTotalPrice()}</span>
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
      // Navigate to login or payment
      navigate('/login', { state: { from: '/booking', bookingData: { selectedServices, selectedDate, selectedTime, total: getTotalPrice() } } });
    }
  };

  return (
    <div className="min-h-screen bg-barbershop-dark pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/')}
            className="text-barbershop-cream hover:text-barbershop-copper"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="flex items-center space-x-2">
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

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {renderStepContent()}

          {/* Actions */}
          <div className="flex justify-end mt-8">
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
