import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

// Cabeçalhos para permitir que o seu site chame esta função
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Esta parte lida com uma chamada de "verificação" do navegador
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Pega os dados que o seu site enviou (nome e serviço)
    const { nome, servico } = await req.json()

    // 2. Pega a URL secreta do Airtable das suas variáveis de ambiente
    const airtableWebhookUrl = Deno.env.get('AIRTABLE_WEBHOOK_URL')
    if (!airtableWebhookUrl) {
      throw new Error('AIRTABLE_WEBHOOK_URL não foi definida nas variáveis de ambiente do Supabase.')
    }

    // 3. Prepara os dados para enviar ao Airtable
    const body = { nome, servico }

    // 4. Faz a chamada do servidor Supabase para o Airtable
    const airtableResponse = await fetch(airtableWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!airtableResponse.ok) {
      throw new Error('Falha ao enviar dados para o Airtable.')
    }

    // 5. Retorna uma resposta de sucesso para o seu site
    return new Response(JSON.stringify({ message: 'Cliente adicionado com sucesso!' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
