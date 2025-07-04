
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardStats, Appointment, PaymentMethodStats } from '@/types';
import { Sale } from '@/types/sales';
import Header from '@/components/Header';
import StatsCards from '@/components/admin/StatsCards';
import AppointmentsTable from '@/components/admin/AppointmentsTable';
import SalesTable from '@/components/admin/SalesTable';
import FinancialSummary from '@/components/admin/FinancialSummary';
import { toast } from 'sonner';

const AdminDashboard = () => {
  // Mock data - em produção viria do backend
  const [stats] = useState<DashboardStats>({
    totalSales: 1250.50,
    totalAppointments: 45,
    monthlyRevenue: 8750.00,
    todayAppointments: 12,
    pendingAppointments: 8,
    completedAppointments: 37,
    productsSold: 23,
    averageTicket: 85.50
  });

  const [paymentStats] = useState<PaymentMethodStats[]>([
    { method: 'PIX', amount: 3500.00, percentage: 40, count: 18 },
    { method: 'Cartão de Crédito', amount: 3062.50, percentage: 35, count: 15 },
    { method: 'Cartão de Débito', amount: 1750.00, percentage: 20, count: 8 },
    { method: 'Dinheiro', amount: 437.50, percentage: 5, count: 4 }
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      client_id: '1',
      start_time: '2024-01-20T10:00:00',
      end_time: '2024-01-20T11:00:00',
      status: 'Confirmed',
      services_value: 80,
      booking_fee: 5,
      total_value: 85,
      payment_method: 'PIX',
      services: [
        { id: '1', name: 'Corte Clássico', description: 'Corte tradicional', price: 50, duration_in_minutes: 45 },
        { id: '2', name: 'Barba', description: 'Aparar barba', price: 30, duration_in_minutes: 15 }
      ],
      client: { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-9999', role: 'Client' }
    },
    {
      id: '2',
      client_id: '2',
      start_time: '2024-01-20T14:00:00',
      end_time: '2024-01-20T15:30:00',
      status: 'Completed',
      services_value: 120,
      booking_fee: 5,
      total_value: 125,
      payment_method: 'Cartão de Crédito',
      services: [
        { id: '3', name: 'Corte + Barba Premium', description: 'Serviço completo', price: 120, duration_in_minutes: 90 }
      ],
      client: { id: '2', name: 'Pedro Santos', email: 'pedro@email.com', phone: '(11) 88888-8888', role: 'Client' }
    }
  ]);

  const [sales] = useState<Sale[]>([
    {
      id: '1',
      products: [
        { 
          product: { 
            id: '1', name: 'Pomada Premium', brand: 'Gentleman\'s Choice', price: 65, 
            image: '', rating: 4.8, description: '', features: [], stock: 15, category: 'cabelo' 
          }, 
          quantity: 2 
        }
      ],
      total: 130,
      date: '2024-01-20T15:30:00',
      customer_name: 'Carlos Lima',
      status: 'completed'
    },
    {
      id: '2',
      products: [
        { 
          product: { 
            id: '2', name: 'Óleo para Barba', brand: 'Barber\'s Secret', price: 45, 
            image: '', rating: 4.9, description: '', features: [], stock: 23, category: 'barba' 
          }, 
          quantity: 1 
        }
      ],
      total: 45,
      date: '2024-01-20T16:00:00',
      customer_name: 'Roberto Oliveira',
      status: 'completed'
    }
  ]);

  const handleCompleteAppointment = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'Completed' as const }
          : apt
      )
    );
    toast.success('Agendamento finalizado com sucesso!');
  };

  const handleEditAppointment = (appointmentId: string) => {
    toast.info(`Editando agendamento ${appointmentId}`);
    // Aqui implementaria a lógica de edição
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'Cancelled' as const }
          : apt
      )
    );
    toast.success('Agendamento cancelado');
  };

  return (
    <div className="min-h-screen bg-barbershop-dark">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-oswald font-bold text-barbershop-cream mb-2">
            Painel Administrativo
          </h1>
          <p className="text-barbershop-cream/80">
            Gerencie agendamentos, vendas e acompanhe o desempenho da barbearia
          </p>
        </div>

        <StatsCards stats={stats} />

        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-barbershop-slate">
            <TabsTrigger value="appointments" className="text-barbershop-cream">
              Agendamentos
            </TabsTrigger>
            <TabsTrigger value="sales" className="text-barbershop-cream">
              Vendas de Produtos
            </TabsTrigger>
            <TabsTrigger value="financial" className="text-barbershop-cream">
              Financeiro
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <AppointmentsTable
              appointments={appointments}
              onEdit={handleEditAppointment}
              onComplete={handleCompleteAppointment}
              onCancel={handleCancelAppointment}
            />
          </TabsContent>

          <TabsContent value="sales">
            <SalesTable sales={sales} />
          </TabsContent>

          <TabsContent value="financial">
            <FinancialSummary paymentStats={paymentStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
