
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import { DashboardStats } from '@/types';

interface StatsCardsProps {
  stats: DashboardStats;
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="bg-barbershop-slate border-barbershop-steel">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-barbershop-cream">
            Faturamento Mensal
          </CardTitle>
          <DollarSign className="h-4 w-4 text-barbershop-copper" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-barbershop-cream">
            R$ {stats.monthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-barbershop-cream/60">
            +12% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>

      <Card className="bg-barbershop-slate border-barbershop-steel">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-barbershop-cream">
            Agendamentos Hoje
          </CardTitle>
          <Calendar className="h-4 w-4 text-barbershop-copper" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-barbershop-cream">
            {stats.todayAppointments}
          </div>
          <p className="text-xs text-barbershop-cream/60">
            {stats.pendingAppointments} pendentes
          </p>
        </CardContent>
      </Card>

      <Card className="bg-barbershop-slate border-barbershop-steel">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-barbershop-cream">
            Produtos Vendidos
          </CardTitle>
          <ShoppingCart className="h-4 w-4 text-barbershop-copper" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-barbershop-cream">
            {stats.productsSold}
          </div>
          <p className="text-xs text-barbershop-cream/60">
            Este mês
          </p>
        </CardContent>
      </Card>

      <Card className="bg-barbershop-slate border-barbershop-steel">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-barbershop-cream">
            Ticket Médio
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-barbershop-copper" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-barbershop-cream">
            R$ {stats.averageTicket.toFixed(2)}
          </div>
          <p className="text-xs text-barbershop-cream/60">
            +5% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
