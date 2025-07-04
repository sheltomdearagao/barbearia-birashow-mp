/**
 * Esta é a nossa ferramenta para enviar os dados de um novo cliente
 * para a fila de atendimento no Airtable.
 *
 * @param {string} nomeDoCliente - O nome do cliente que pagou.
 * @param {string} servicoComprado - O nome do serviço que ele comprou.
 */
export async function adicionarClienteNaFila(nomeDoCliente, servicoComprado) {
  // 1. Cole aqui a URL do webhook que você pegou do Airtable.
  const webhookURL = 'https://hooks.airtable.com/workflows/v1/genericWebhook/appfotmJtO6qyvbPc/wflP0MRoq8yJHBXda/wtrZSJRM6m2yLiy2e';

  // 2. Preparamos a "encomenda" com os dados do cliente.
  // Os nomes 'nome' e 'servico' devem corresponder ao que você espera
  // receber na automação do Airtable.
  const dados = {
    nome: nomeDoCliente,
    servico: servicoComprado,
  };

  // 3. Usamos o 'fetch' para fazer a "ligação" para o Airtable.
  // O 'try...catch' é uma rede de segurança para caso a internet caia ou dê erro.
  try {
    const response = await fetch(webhookURL, {
      method: 'POST', // Usamos POST para ENVIAR dados.
      headers: {
        'Content-Type': 'application/json', // Avisamos que estamos enviando um pacote no formato JSON.
      },
      body: JSON.stringify(dados), // Convertemos nosso pacote de dados para texto.
    });

    // 4. Verificamos se a ligação foi um sucesso.
    if (response.ok) {
      console.log('Sucesso! Cliente enviado para a fila do Airtable.');
      return true; // Retorna verdadeiro se deu tudo certo.
    } else {
      console.error('Falha ao enviar para o Airtable.');
      return false; // Retorna falso se deu algo errado.
    }
  } catch (error) {
    console.error('Erro de conexão ou na chamada:', error);
    return false;
  }
}
