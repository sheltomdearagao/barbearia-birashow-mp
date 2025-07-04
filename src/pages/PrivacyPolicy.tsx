import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
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
            Política de Dados e Privacidade
          </h1>

          <div className="bg-barbershop-slate border border-barbershop-steel rounded-lg p-6 lg:p-8 space-y-6 text-barbershop-cream/90">
            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">1. Informações Gerais</h2>
              <p className="leading-relaxed">
                Esta Política de Privacidade descreve como a Barbearia Bira Show coleta, usa, 
                armazena e protege suas informações pessoais, em conformidade com a Lei Geral 
                de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">2. Dados Coletados</h2>
              <p className="leading-relaxed mb-3">Coletamos as seguintes informações:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Dados de identificação:</strong> nome, telefone, e-mail</li>
                <li><strong>Dados de agendamento:</strong> horários, serviços escolhidos, histórico</li>
                <li><strong>Dados de navegação:</strong> informações sobre o uso de nossa plataforma</li>
                <li><strong>Dados de localização:</strong> quando necessário para localização da barbearia</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">3. Finalidades do Tratamento</h2>
              <p className="leading-relaxed mb-3">Utilizamos seus dados para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Realizar agendamentos e prestação de serviços</li>
                <li>Comunicação sobre serviços e agendamentos</li>
                <li>Melhorar nossos serviços e experiência do cliente</li>
                <li>Cumprir obrigações legais e contratuais</li>
                <li>Marketing direto (com seu consentimento)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">4. Base Legal - LGPD</h2>
              <p className="leading-relaxed mb-3">
                O tratamento de seus dados é baseado nas seguintes hipóteses legais da LGPD:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Execução de contrato:</strong> para prestação de serviços</li>
                <li><strong>Consentimento:</strong> para marketing e comunicações promocionais</li>
                <li><strong>Legítimo interesse:</strong> para melhorar nossos serviços</li>
                <li><strong>Cumprimento de obrigação legal:</strong> quando exigido por lei</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">5. Compartilhamento de Dados</h2>
              <p className="leading-relaxed">
                Não compartilhamos seus dados pessoais com terceiros, exceto quando necessário 
                para prestação de serviços (como processadores de pagamento) ou quando 
                exigido por lei. Todos os fornecedores são obrigados a proteger suas informações.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">6. Seus Direitos (LGPD)</h2>
              <p className="leading-relaxed mb-3">Você tem os seguintes direitos:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Acesso:</strong> confirmar se tratamos seus dados</li>
                <li><strong>Correção:</strong> solicitar correção de dados incompletos ou incorretos</li>
                <li><strong>Exclusão:</strong> solicitar eliminação de dados desnecessários</li>
                <li><strong>Portabilidade:</strong> solicitar transferência de dados a outro fornecedor</li>
                <li><strong>Oposição:</strong> opor-se ao tratamento com base em legítimo interesse</li>
                <li><strong>Revogação do consentimento:</strong> retirar consentimento a qualquer momento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">7. Segurança dos Dados</h2>
              <p className="leading-relaxed">
                Implementamos medidas técnicas e organizacionais adequadas para proteger 
                seus dados contra acesso não autorizado, alteração, divulgação ou destruição. 
                Utilizamos criptografia e sistemas seguros de armazenamento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">8. Retenção de Dados</h2>
              <p className="leading-relaxed">
                Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas 
                nesta política, respeitando prazos legais aplicáveis. Dados de agendamento são 
                mantidos por até 5 anos para fins fiscais e contratuais.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">9. Cookies e Tecnologias Similares</h2>
              <p className="leading-relaxed">
                Utilizamos cookies e tecnologias similares para melhorar sua experiência 
                em nossa plataforma, analisar o tráfego e personalizar conteúdo. 
                Você pode gerenciar suas preferências de cookies nas configurações do navegador.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">10. Alterações na Política</h2>
              <p className="leading-relaxed">
                Esta política pode ser atualizada periodicamente. Notificaremos sobre 
                mudanças significativas através dos nossos canais de comunicação.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-barbershop-copper mb-3">11. Contato - Encarregado de Dados</h2>
              <p className="leading-relaxed">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, 
                entre em contato através dos canais disponíveis em nosso site. 
                Responderemos às solicitações em até 15 dias úteis, conforme exigido pela LGPD.
              </p>
            </section>

            <div className="text-sm text-barbershop-cream/70 pt-6 border-t border-barbershop-steel">
              Última atualização: Janeiro de 2025<br/>
              Esta política está em conformidade com a LGPD (Lei nº 13.709/2018)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;