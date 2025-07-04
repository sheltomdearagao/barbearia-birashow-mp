
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Lock, User, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const bookingData = location.state?.bookingData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login/signup - in real app would call API
    console.log('Form submitted:', formData);
    
    // If there's booking data, proceed to payment
    if (bookingData) {
      navigate('/payment', { state: { bookingData } });
    } else {
      navigate('/client-area');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-barbershop-dark pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="text-barbershop-cream hover:text-barbershop-copper"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>

          <Card className="bg-barbershop-slate border-barbershop-steel">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-oswald text-barbershop-cream">
                {isLogin ? 'Fazer Login' : 'Criar Conta'}
              </CardTitle>
              <CardDescription className="text-barbershop-cream/70">
                {isLogin 
                  ? 'Entre com sua conta para continuar' 
                  : 'Crie sua conta para agendar serviços'
                }
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-barbershop-cream">Nome Completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-barbershop-cream/60" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required={!isLogin}
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10 bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream"
                          placeholder="Seu nome completo"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-barbershop-cream">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-barbershop-cream/60" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required={!isLogin}
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="pl-10 bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-barbershop-cream">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-barbershop-cream/60" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-barbershop-cream">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-barbershop-cream/60" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream"
                      placeholder="Sua senha"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full copper-gradient mt-6">
                  {isLogin ? 'Entrar' : 'Criar Conta'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-barbershop-copper hover:text-barbershop-bronze transition-colors"
                >
                  {isLogin 
                    ? 'Não tem conta? Criar uma agora' 
                    : 'Já tem conta? Fazer login'
                  }
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
