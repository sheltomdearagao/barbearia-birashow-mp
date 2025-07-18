import express from 'express';
import mercadopago from 'mercadopago';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
app.use(express.json());
app.use(cors());

// Instancie o MercadoPago com o access token
const mp = new mercadopago.MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

// Use o client de preferências
const preference = new mercadopago.Preference(mp);

// Rota para criar preferência de pagamento
app.post('/create_preference', async (req, res) => {
  try {
    const { title, quantity, price } = req.body;
    const result = await preference.create({
      body: {
        items: [
          {
            title: title || "Serviço",
            quantity: Number(quantity) || 1,
            currency_id: 'BRL',
            unit_price: Number(price) || 1,
          }
        ]
      }
    });
    res.json({ id: result.id });
  } catch (error) {
    // Mostra o erro completo no terminal
    console.error('Erro ao criar preferência:', error);
    res.status(500).json({ error: error.message, details: error });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Mercado Pago backend rodando na porta ${PORT}`)); 