import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProfile, getPurchases } from '@/services/supabaseService';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Edit, 
  Save, 
  X,
  ArrowLeft,
  Star
} from 'lucide-react';

interface ProfileData {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf?: string;
}

interface AppointmentData {
  id: string;
  data: Date;
  servico: string;
  status: 'Confirmado' | 'Concluído' | 'Cancelado';
  valor: number;
  turno: string;
  horario: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const prof = await getProfile();
        setProfile(prof);
        setEditForm({
          nome: prof?.nome || '',
          email: prof?.email || '',
          telefone: prof?.telefone || '',
          senha: '',
          confirmarSenha: ''
        });
        
        // Mock de agendamentos (substituir por getAppointments quando implementado)
        const mockAppointments: AppointmentData[] = [
          {
            id: '1',
            data: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 dias no futuro
            servico: 'Corte à Tesoura + Barba',
            status: 'Confirmado' as const,
            valor: 50,
            turno: 'Tarde',
            horario: '14:00'
          },
          {
            id: '2',
            data: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 dias atrás
            servico: 'Pacote Completo',
            status: 'Concluído' as const,
            valor: 60,
            turno: 'Manhã',
            horario: '10:00'
          },
          {
            id: '3',
            data: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 dias atrás
            servico: 'Barba',
            status: 'Concluído' as const,
            valor: 20,
            turno: 'Noite',
            horario: '19:00'
          }
        ];
        setAppointments(mockAppointments);
      } catch (err: unknown) {
        setError('Erro ao carregar perfil ou histórico.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      nome: profile?.nome || '',
      email: profile?.email || '',
      telefone: profile?.telefone || '',
      senha: '',
      confirmarSenha: ''
    });
  };

  const handleSave = async () => {
    // Aqui implementar a lógica de atualização do perfil
    try {
      // await updateProfile(editForm);
      setProfile({ ...profile, ...editForm });
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  const getNextAppointment = () => {
    const now = new Date();
    return appointments
      .filter(apt => apt.data > now && apt.status === 'Confirmado')
      .sort((a, b) => a.data.getTime() - b.data.getTime())[0];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado': return 'text-green-500';
      case 'Concluído': return 'text-blue-500';
      case 'Cancelado': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Confirmado': return <CheckCircle className="h-4 w-4" />;
      case 'Concluído': return <CheckCircle className="h-4 w-4" />;
      case 'Cancelado': return <X className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-barbershop-dark pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-barbershop-cream text-lg">Carregando...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-barbershop-dark pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500 text-lg">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  const nextAppointment = getNextAppointment();

  return (
    <div className="min-h-screen bg-barbershop-dark pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-barbershop-cream hover:text-barbershop-copper"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-oswald font-bold text-barbershop-cream">Meu Perfil</h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="perfil" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-barbershop-slate border-barbershop-steel">
              <TabsTrigger 
                value="perfil" 
                className="text-barbershop-cream data-[state=active]:bg-barbershop-copper data-[state=active]:text-barbershop-dark"
              >
                <User className="h-4 w-4 mr-2" />
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger 
                value="agendamentos" 
                className="text-barbershop-cream data-[state=active]:bg-barbershop-copper data-[state=active]:text-barbershop-dark"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Meus Agendamentos
              </TabsTrigger>
            </TabsList>

            {/* Tab: Dados Pessoais */}
            <TabsContent value="perfil" className="space-y-6">
              <Card className="bg-barbershop-slate border-barbershop-steel">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl text-barbershop-cream">Informações Pessoais</CardTitle>
                  {!isEditing ? (
                    <Button
                      onClick={handleEdit}
                      variant="outline"
                      size="sm"
                      className="border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-dark"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        onClick={handleSave}
                        size="sm"
                        className="copper-gradient"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                        className="border-barbershop-steel text-barbershop-cream hover:bg-barbershop-steel"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  {!isEditing ? (
                    // Modo visualização
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="flex items-center space-x-3 p-4 bg-barbershop-charcoal rounded-lg">
                        <User className="h-6 w-6 text-barbershop-copper" />
                        <div>
                          <Label className="text-sm text-barbershop-cream/60">Nome</Label>
                          <p className="text-barbershop-cream font-semibold">{profile?.nome}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-barbershop-charcoal rounded-lg">
                        <Mail className="h-6 w-6 text-barbershop-copper" />
                        <div>
                          <Label className="text-sm text-barbershop-cream/60">E-mail</Label>
                          <p className="text-barbershop-cream font-semibold">{profile?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-barbershop-charcoal rounded-lg">
                        <Phone className="h-6 w-6 text-barbershop-copper" />
                        <div>
                          <Label className="text-sm text-barbershop-cream/60">Telefone</Label>
                          <p className="text-barbershop-cream font-semibold">{profile?.telefone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 bg-barbershop-charcoal rounded-lg">
                        <Lock className="h-6 w-6 text-barbershop-copper" />
                        <div>
                          <Label className="text-sm text-barbershop-cream/60">Senha</Label>
                          <p className="text-barbershop-cream font-semibold">••••••••</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Modo edição
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nome" className="text-barbershop-cream">Nome</Label>
                        <Input
                          id="nome"
                          value={editForm.nome}
                          onChange={(e) => setEditForm({...editForm, nome: e.target.value})}
                          className="bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-barbershop-cream">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          className="bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefone" className="text-barbershop-cream">Telefone</Label>
                        <Input
                          id="telefone"
                          value={editForm.telefone}
                          onChange={(e) => setEditForm({...editForm, telefone: e.target.value})}
                          className="bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="senha" className="text-barbershop-cream">Nova Senha</Label>
                        <Input
                          id="senha"
                          type="password"
                          value={editForm.senha}
                          onChange={(e) => setEditForm({...editForm, senha: e.target.value})}
                          className="bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream"
                          placeholder="Deixe em branco para manter"
                        />
                      </div>
                      {editForm.senha && (
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="confirmarSenha" className="text-barbershop-cream">Confirmar Nova Senha</Label>
                          <Input
                            id="confirmarSenha"
                            type="password"
                            value={editForm.confirmarSenha}
                            onChange={(e) => setEditForm({...editForm, confirmarSenha: e.target.value})}
                            className="bg-barbershop-charcoal border-barbershop-steel text-barbershop-cream"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Agendamentos */}
            <TabsContent value="agendamentos" className="space-y-6">
              {/* Próximo Agendamento */}
              {nextAppointment && (
                <Card className="bg-gradient-to-r from-barbershop-copper/20 to-barbershop-bronze/20 border-barbershop-copper">
                  <CardHeader>
                    <CardTitle className="text-xl text-barbershop-cream flex items-center">
                      <AlertCircle className="h-6 w-6 mr-3 text-barbershop-copper" />
                      Próximo Agendamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-barbershop-cream">{nextAppointment.servico}</h3>
                        <p className="text-barbershop-cream/80">{formatDate(nextAppointment.data)}</p>
                        <p className="text-barbershop-cream/70 text-sm">
                          {nextAppointment.turno} • {nextAppointment.horario}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-barbershop-copper">
                          R$ {nextAppointment.valor.toFixed(2)}
                        </div>
                        <div className="flex items-center text-green-500 text-sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Confirmado
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Histórico de Agendamentos */}
              <Card className="bg-barbershop-slate border-barbershop-steel">
                <CardHeader>
                  <CardTitle className="text-xl text-barbershop-cream">Histórico de Agendamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  {appointments.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-barbershop-cream/40 mx-auto mb-4" />
                      <p className="text-barbershop-cream/60">Nenhum agendamento encontrado.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {appointments
                        .sort((a, b) => b.data.getTime() - a.data.getTime())
                        .map((appointment) => (
                          <div
                            key={appointment.id}
                            className={`p-4 rounded-lg border transition-all ${
                              appointment.id === nextAppointment?.id
                                ? 'bg-barbershop-copper/10 border-barbershop-copper'
                                : 'bg-barbershop-charcoal border-barbershop-steel'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-semibold text-barbershop-cream">{appointment.servico}</h4>
                                  <div className={`flex items-center text-sm ${getStatusColor(appointment.status)}`}>
                                    {getStatusIcon(appointment.status)}
                                    <span className="ml-1">{appointment.status}</span>
                                  </div>
                                </div>
                                <p className="text-barbershop-cream/80 text-sm">{formatDate(appointment.data)}</p>
                                <p className="text-barbershop-cream/70 text-sm">
                                  {appointment.turno} • {appointment.horario}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-barbershop-copper">
                                  R$ {appointment.valor.toFixed(2)}
                                </div>
                                {appointment.id === nextAppointment?.id && (
                                  <div className="text-xs text-barbershop-copper font-semibold mt-1">
                                    PRÓXIMO
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile; 