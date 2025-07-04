
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, CheckCircle, XCircle, DollarSign, CreditCard, Banknote } from 'lucide-react';
import { Appointment } from '@/types';

interface AppointmentsTableProps {
  appointments: Appointment[];
  onEdit: (id: string) => void;
  onComplete: (id: string) => void;
  onCancel: (id: string) => void;
}

const AppointmentsTable = ({ appointments, onEdit, onComplete, onCancel }: AppointmentsTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'text-blue-600';
      case 'Completed': return 'text-green-600';
      case 'Cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmed': return <Clock className="h-4 w-4" />;
      case 'Completed': return <CheckCircle className="h-4 w-4" />;
      case 'Cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'PIX': return <Banknote className="h-4 w-4" />;
      case 'Cartão de Crédito':
      case 'Cartão de Débito': return <CreditCard className="h-4 w-4" />;
      case 'Dinheiro': return <DollarSign className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-barbershop-slate border-barbershop-steel">
      <CardHeader>
        <CardTitle className="text-barbershop-cream">
          Agendamentos Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-barbershop-cream">Cliente</TableHead>
              <TableHead className="text-barbershop-cream">Data/Hora</TableHead>
              <TableHead className="text-barbershop-cream">Serviços</TableHead>
              <TableHead className="text-barbershop-cream">Valor</TableHead>
              <TableHead className="text-barbershop-cream">Pagamento</TableHead>
              <TableHead className="text-barbershop-cream">Status</TableHead>
              <TableHead className="text-barbershop-cream">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="text-barbershop-cream">
                  <div>
                    <div className="font-medium">{appointment.client?.name}</div>
                    <div className="text-sm text-barbershop-cream/60">
                      {appointment.client?.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-barbershop-cream">
                  {new Date(appointment.start_time).toLocaleString('pt-BR')}
                </TableCell>
                <TableCell className="text-barbershop-cream">
                  {appointment.services.map(service => service.name).join(', ')}
                </TableCell>
                <TableCell className="text-barbershop-cream">
                  R$ {appointment.total_value.toFixed(2)}
                </TableCell>
                <TableCell className="text-barbershop-cream">
                  <div className="flex items-center space-x-1">
                    {getPaymentIcon(appointment.payment_method || 'PIX')}
                    <span>{appointment.payment_method || 'PIX'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`flex items-center space-x-1 ${getStatusColor(appointment.status)}`}>
                    {getStatusIcon(appointment.status)}
                    <span>{appointment.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onEdit(appointment.id)}
                    >
                      Editar
                    </Button>
                    {appointment.status === 'Confirmed' && (
                      <>
                        <Button 
                          size="sm" 
                          className="copper-gradient"
                          onClick={() => onComplete(appointment.id)}
                        >
                          Finalizar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => onCancel(appointment.id)}
                        >
                          Cancelar
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AppointmentsTable;
