
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle } from 'lucide-react';
import { Sale } from '@/types/sales';

interface SalesTableProps {
  sales: Sale[];
}

const SalesTable = ({ sales }: SalesTableProps) => {
  return (
    <Card className="bg-barbershop-slate border-barbershop-steel">
      <CardHeader>
        <CardTitle className="text-barbershop-cream">
          Vendas de Produtos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-barbershop-cream">Data</TableHead>
              <TableHead className="text-barbershop-cream">Cliente</TableHead>
              <TableHead className="text-barbershop-cream">Produtos</TableHead>
              <TableHead className="text-barbershop-cream">Quantidade</TableHead>
              <TableHead className="text-barbershop-cream">Total</TableHead>
              <TableHead className="text-barbershop-cream">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="text-barbershop-cream">
                  {new Date(sale.date).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell className="text-barbershop-cream">
                  {sale.customer_name}
                </TableCell>
                <TableCell className="text-barbershop-cream">
                  {sale.products.map(item => item.product.name).join(', ')}
                </TableCell>
                <TableCell className="text-barbershop-cream">
                  {sale.products.reduce((sum, item) => sum + item.quantity, 0)}
                </TableCell>
                <TableCell className="text-barbershop-cream">
                  R$ {sale.total.toFixed(2)}
                </TableCell>
                <TableCell>
                  <span className="text-green-600 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Concluída
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SalesTable;
