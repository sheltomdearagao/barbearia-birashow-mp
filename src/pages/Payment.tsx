import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Lock, User } from 'lucide-react';
import { registerPurchase } from '@/services/supabaseService';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://barbearia-birashow-backend.up.railway.app';

const Payment = () => {
  const navigate = useNavigate();

  // Estado para guardar os dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  // Resumo do pedido (em um app real, viria da página anterior)
  const orderSummary = {
    service: 'Corte + Barba',
    barber: 'João Silva',
    date: '25/06/2025',
    time: '14:30',
    price: 45.00
  };

  // Função para atualizar o estado quando o usuário digita
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Função chamada ao enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Chama o backend para criar a preferência Mercado Pago
      const response = await fetch(`${BACKEND_URL}/create_preference`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: orderSummary.service,
          quantity: 1,
          price: orderSummary.price
        })
      });
      const data = await response.json();
      if (data.id) {
        // Salva a compra no Supabase (histórico)
        await registerPurchase({
          servico: orderSummary.service,
          valor: orderSummary.price,
          meio_pagamento: 'Mercado Pago'
        });
        // Redireciona para o Checkout Pro do Mercado Pago
        window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${data.id}`;
      } else {
        alert('Erro ao criar preferência de pagamento. Tente novamente.');
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor de pagamento.');
    }
  };

  return (
    <div className="min-h-screen bg-barbershop-dark pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Coluna do Formulário (2/3 da tela) */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <Card className="bg-barbershop-slate border-barbershop-steel">
                <CardHeader>
                  <CardTitle className="text-barbershop-cream flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Seus Dados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-barbershop-cream">Nome Completo</Label>
                      <Input id="name" name="name" required value={formData.name} onChange={handleInputChange} className="bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream" placeholder="Seu nome completo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-barbershop-cream">Email</Label>
                      <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} className="bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream" placeholder="seu@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="phone" className="text-barbershop-cream">Telefone</Label>
                      <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} className="bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream" placeholder="(11) 99999-9999" />
                  </div>
                </CardContent>
              </Card>

              {/* Dados do Cartão */}
              <Card className="bg-barbershop-slate border-barbershop-steel">
                <CardHeader>
                  <CardTitle className="text-barbershop-cream flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Cartão de Crédito
                  </CardTitle>
                  <CardDescription className="text-barbershop-cream/70">Seus dados estão seguros e protegidos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-barbershop-cream">Número do Cartão</Label>
                    <Input id="cardNumber" name="cardNumber" required value={formData.cardNumber} onChange={handleInputChange} className="bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream" placeholder="0000 0000 0000 0000" maxLength={19} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName" className="text-barbershop-cream">Nome no Cartão</Label>
                    <Input id="cardName" name="cardName" required value={formData.cardName} onChange={handleInputChange} className="bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream" placeholder="Nome como está no cartão" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate" className="text-barbershop-cream">Validade</Label>
                      <Input id="expiryDate" name="expiryDate" required value={formData.expiryDate} onChange={handleInputChange} className="bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream" placeholder="MM/AA" maxLength={5} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-barbershop-cream">CVV</Label>
                      <Input id="cvv" name="cvv" required value={formData.cvv} onChange={handleInputChange} className="bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream" placeholder="000" maxLength={4} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full copper-gradient text-lg py-6">
                <Lock className="h-5 w-5 mr-2" />
                Finalizar Pagamento - R$ {orderSummary.price.toFixed(2)}
              </Button>
            </form>
          </div>

          {/* Coluna do Resumo do Pedido (1/3 da tela) */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="bg-barbershop-slate border-barbershop-steel">
              <CardHeader>
                <CardTitle className="text-barbershop-cream">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-barbershop-cream">{orderSummary.service}</h3>
                      <p className="text-sm text-barbershop-cream/70">com {orderSummary.barber}</p>
                    </div>
                    <span className="font-semibold text-barbershop-copper">R$ {orderSummary.price.toFixed(2)}</span>
                  </div>
                  <Separator className="bg-barbershop-steel" />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-barbershop-cream/70">Data:</span><span className="text-barbershop-cream">{orderSummary.date}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-barbershop-cream/70">Horário:</span><span className="text-barbershop-cream">{orderSummary.time}</span></div>
                  </div>
                  <Separator className="bg-barbershop-steel" />
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-barbershop-cream">Total:</span>
                    <span className="text-barbershop-copper">R$ {orderSummary.price.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
