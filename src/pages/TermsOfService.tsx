import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-barbershop-dark">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="outline" className="mb-6 border-barbershop-copper text-barbershop-copper hover:bg-barbershop-copper hover:text-barbershop-dark">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-oswald font-bold text-barbershop-cream mb-8">
            Termos de Uso
          </h1>

          <div className="bg-barbershop-slate border border-barbershop-steel rounded-lg p-6 lg:p-8 space-y-6 text-barbershop-cream/90">
            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">1. Aceitação dos Termos</h2>
              <p className="leading-relaxed">
                Ao utilizar os serviços da Barbearia Bira Show, você concorda com estes Termos de Uso. 
                Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">2. Descrição dos Serviços</h2>
              <p className="leading-relaxed">
                A Barbearia Bira Show oferece serviços de barbearia, incluindo cortes de cabelo, barba, 
                tratamentos capilares e venda de produtos relacionados. Também oferecemos sistema de 
                agendamento online através de nossa plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">3. Agendamentos</h2>
              <p className="leading-relaxed mb-3">
                Os agendamentos podem ser feitos através de nossa plataforma online ou presencialmente. 
                As seguintes regras se aplicam:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cancelamentos devem ser feitos com pelo menos 2 horas de antecedência</li>
                <li>Não comparecimento sem aviso prévio pode resultar em cobrança de taxa</li>
                <li>Reagendamentos estão sujeitos à disponibilidade</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">4. Pagamentos</h2>
              <p className="leading-relaxed">
                Aceitamos pagamentos em dinheiro, cartões de débito e crédito, e PIX. 
                Os preços estão sujeitos a alterações sem aviso prévio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">5. Proteção de Dados - LGPD</h2>
              <p className="leading-relaxed">
                Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), 
                coletamos e processamos seus dados pessoais apenas para as finalidades descritas 
                em nossa Política de Privacidade. Você tem direito ao acesso, correção, 
                exclusão e portabilidade de seus dados.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">6. Responsabilidades</h2>
              <p className="leading-relaxed">
                A Barbearia Bira Show não se responsabiliza por danos decorrentes de reações 
                alérgicas não informadas previamente pelo cliente ou por resultados insatisfatórios 
                devido a informações incorretas fornecidas pelo cliente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">7. Alterações dos Termos</h2>
              <p className="leading-relaxed">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                As alterações entrarão em vigor imediatamente após a publicação em nossa plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">8. Contato</h2>
              <p className="leading-relaxed">
                Para questões relacionadas a estes termos, entre em contato conosco através 
                dos canais disponíveis em nosso site ou presencialmente em nossa loja.
              </p>
            </section>

            <div className="text-sm text-barbershop-cream/70 pt-6 border-t border-barbershop-steel">
              Última atualização: Janeiro de 2025
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;