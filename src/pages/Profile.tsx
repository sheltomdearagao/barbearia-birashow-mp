import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getProfile, getPurchases } from '@/services/supabaseService';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const prof = await getProfile();
        setProfile(prof);
        const hist = await getPurchases();
        setPurchases(hist || []);
      } catch (err: any) {
        setError('Erro ao carregar perfil ou histórico.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-barbershop-dark pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <Card className="bg-barbershop-slate border-barbershop-steel">
            <CardHeader>
              <CardTitle className="text-barbershop-cream">Meu Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-barbershop-cream">Carregando...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : profile ? (
                <div className="space-y-2">
                  <div><span className="font-semibold text-barbershop-copper">Nome:</span> <span className="text-barbershop-cream">{profile.nome}</span></div>
                  <div><span className="font-semibold text-barbershop-copper">Telefone:</span> <span className="text-barbershop-cream">{profile.telefone}</span></div>
                  <div><span className="font-semibold text-barbershop-copper">CPF:</span> <span className="text-barbershop-cream">{profile.cpf || '-'}</span></div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card className="bg-barbershop-slate border-barbershop-steel">
            <CardHeader>
              <CardTitle className="text-barbershop-cream">Histórico de Compras</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-barbershop-cream">Carregando...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : purchases.length === 0 ? (
                <div className="text-barbershop-cream/70">Nenhuma compra encontrada.</div>
              ) : (
                <ul className="divide-y divide-barbershop-steel">
                  {purchases.map((purchase) => (
                    <li key={purchase.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-semibold text-barbershop-copper">{purchase.servico}</div>
                        <div className="text-barbershop-cream/80 text-sm">{new Date(purchase.data).toLocaleString('pt-BR')}</div>
                        <div className="text-barbershop-cream/70 text-xs">Pagamento: {purchase.meio_pagamento}</div>
                      </div>
                      <div className="text-barbershop-copper font-bold text-lg mt-2 md:mt-0">R$ {Number(purchase.valor).toFixed(2)}</div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button variant="ghost" onClick={() => navigate('/')}>Voltar para o início</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 