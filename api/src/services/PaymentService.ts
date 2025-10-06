import Stripe from 'stripe';

// Inicializar Stripe apenas se a chave estiver disponível
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-09-30.clover',
    })
  : null;

export class PaymentService {
  static async createPaymentIntent(amount: number, currency: string = 'brl') {
    if (!stripe) {
      throw new Error('Stripe não configurado. Verifique a variável STRIPE_SECRET_KEY');
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe usa centavos
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        clientSecret: paymentIntent.client_secret,
        id: paymentIntent.id,
      };
    } catch (error) {
      console.error('Erro ao criar PaymentIntent:', error);
      throw new Error('Falha ao processar pagamento');
    }
  }

  static async confirmPayment(paymentIntentId: string) {
    if (!stripe) {
      throw new Error('Stripe não configurado. Verifique a variável STRIPE_SECRET_KEY');
    }

    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status === 'succeeded') {
        return {
          success: true,
          paymentIntent,
        };
      }

      return {
        success: false,
        status: paymentIntent.status,
      };
    } catch (error) {
      console.error('Erro ao confirmar pagamento:', error);
      throw new Error('Falha ao confirmar pagamento');
    }
  }
}
