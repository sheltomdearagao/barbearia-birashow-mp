import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Calendar, Clock, User, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

// Importamos nossa ferramenta de integração
import { adicionarClienteNaFila } from '../services/airtable';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Pegamos os dados reais do location.state
  const appointmentDetails = location.state || {};

  // Usamos o useEffect para disparar a automação
  useEffect(() => {
    // Verificamos se temos os dados necessários antes de enviar
    if (appointmentDetails.clientName && appointmentDetails.service) {
      
      // ESTA É A LINHA QUE PRECISAMOS VER NO CONSOLE
      console.log('Página de sucesso carregada. Enviando cliente para a fila...');
      
      // Chamamos nossa função, passando os dados REAIS do agendamento.
      adicionarClienteNaFila(appointmentDetails.clientName, appointmentDetails.service);

    } else {
      console.log("Dados do agendamento não encontrados. Navegando para a home.");
      navigate('/');
    }
  }, []); // O array vazio garante que isso rode apenas uma vez.

  // Se os dados ainda não carregaram, podemos mostrar um loading
  if (!appointmentDetails.clientName) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-barbershop-dark pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* ... o resto do seu código JSX continua aqui, ele está perfeito ... */}
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-oswald text-barbershop-cream mb-2">
              Pagamento Realizado com Sucesso!
            </h1>
            <p className="text-barbershop-cream/70">
              Seu agendamento foi confirmado. O barbeiro já foi notificado e você está na fila!
            </p>
          </div>

          {/* Appointment Details */}
          <Card className="bg-barbershop-slate border-barbershop-steel mb-6">
            <CardHeader>
              <CardTitle className="text-barbershop-cream">Detalhes do Agendamento</CardTitle>
              <p className="text-sm text-barbershop-cream/70">
                Número do pedido: {appointmentDetails.orderNumber}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-barbershop-copper mr-3" />
                  <div>
                    <p className="text-sm text-barbershop-cream/70">Data</p>
                    <p className="font-semibold text-barbershop-cream">{appointmentDetails.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-barbershop-copper mr-3" />
                  <div>
                    <p className="text-sm text-barbershop-cream/70">Horário</p>
                    <p className="font-semibold text-barbershop-cream">{appointmentDetails.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <User className="h-5 w-5 text-barbershop-copper mr-3" />
                  <div>
                    <p className="text-sm text-barbershop-cream/70">Barbeiro</p>
                    <p className="font-semibold text-barbershop-cream">{appointmentDetails.barber}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-barbershop-copper mr-3" />
                  <div>
                    <p className="text-sm text-barbershop-cream/70">Serviço</p>
                    <p className="font-semibold text-barbershop-cream">{appointmentDetails.service}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-barbershop-steel pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-barbershop-cream">Valor Pago:</span>
                  <span className="text-2xl font-bold text-barbershop-copper">
                    R$ {appointmentDetails.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => navigate('/')}
              className="flex-1 copper-gradient"
            >
              <Home className="h-4 w-4 mr-2" />
              Voltar ao Início
            </Button>
            <Button
              onClick={() => navigate('/booking')}
              variant="outline"
              className="flex-1 border-barbershop-steel text-barbershop-cream hover:bg-barbershop-copper hover:text-barbershop-dark"
            >
              Novo Agendamento
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
