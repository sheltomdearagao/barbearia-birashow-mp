
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, CreditCard, Banknote } from 'lucide-react';
import { PaymentMethodStats } from '@/types';

interface FinancialSummaryProps {
  paymentStats: PaymentMethodStats[];
}

const FinancialSummary = ({ paymentStats }: FinancialSummaryProps) => {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-barbershop-slate border-barbershop-steel">
        <CardHeader>
          <CardTitle className="text-barbershop-cream">
            Resumo Financeiro - Hoje
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-barbershop-cream">Serviços realizados:</span>
            <span className="font-bold text-barbershop-copper">R$ 980,00</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-barbershop-cream">Produtos vendidos:</span>
            <span className="font-bold text-barbershop-copper">R$ 270,50</span>
          </div>
          <div className="border-t border-barbershop-steel pt-4">
            <div className="flex justify-between items-center">
              <span className="text-barbershop-cream text-lg">Total do dia:</span>
              <span className="font-bold text-barbershop-copper text-xl">R$ 1.250,50</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-barbershop-slate border-barbershop-steel">
        <CardHeader>
          <CardTitle className="text-barbershop-cream">
            Formas de Pagamento - Este Mês
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentStats.map((stat) => (
            <div key={stat.method} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-barbershop-copper">
                    {getPaymentIcon(stat.method)}
                  </span>
                  <span className="text-barbershop-cream font-medium">{stat.method}</span>
                </div>
                <div className="text-right">
                  <div className="text-barbershop-cream font-bold">
                    R$ {stat.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-barbershop-cream/60">
                    {stat.count} transações
                  </div>
                </div>
              </div>
              <div className="w-full bg-barbershop-charcoal rounded-full h-2">
                <div 
                  className="bg-barbershop-copper h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
              <div className="text-xs text-barbershop-cream/60 text-right">
                {stat.percentage}% do total
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialSummary;
