import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Phone, Mail, Lock, IdCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '@/services/supabaseService';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    password: '',
    cpf: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        nome: formData.nome,
        telefone: formData.telefone,
        cpf: formData.cpf || undefined
      });
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-barbershop-dark pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
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
                Criar Conta
              </CardTitle>
              <CardDescription className="text-barbershop-cream/70">
                Preencha seus dados para criar sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome" className="text-barbershop-cream">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-barbershop-cream/60" />
                    <Input
                      id="nome"
                      name="nome"
                      type="text"
                      required
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="pl-10 bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream"
                      placeholder="Seu nome completo"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-barbershop-cream">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-barbershop-cream/60" />
                    <Input
                      id="telefone"
                      name="telefone"
                      type="tel"
                      required
                      value={formData.telefone}
                      onChange={handleInputChange}
                      className="pl-10 bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
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
                <div className="space-y-2">
                  <Label htmlFor="cpf" className="text-barbershop-cream">CPF (opcional)</Label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-3 h-4 w-4 text-barbershop-cream/60" />
                    <Input
                      id="cpf"
                      name="cpf"
                      type="text"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      className="pl-10 bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream"
                      placeholder="000.000.000-00"
                    />
                  </div>
                </div>
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                <Button type="submit" className="w-full copper-gradient mt-6" disabled={loading}>
                  {loading ? 'Criando...' : 'Criar Conta'}
                </Button>
              </form>
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-barbershop-copper hover:text-barbershop-bronze transition-colors"
                >
                  Já tem conta? Fazer login
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register; 