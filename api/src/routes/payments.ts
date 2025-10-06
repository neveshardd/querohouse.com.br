import { FastifyInstance } from 'fastify';
import { PaymentController } from '../controllers/PaymentController';

/**
 * Rotas de pagamento seguindo o princípio Open/Closed
 * Fácil de estender com novas rotas sem modificar o código existente
 */
export async function paymentRoutes(fastify: FastifyInstance) {
  const paymentController = new PaymentController();

  // Schema para documentação da API
  const createPaymentIntentSchema = {
    body: {
      type: 'object',
      required: ['amount', 'planId'],
      properties: {
        amount: { type: 'number', minimum: 0 },
        planId: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          clientSecret: { type: 'string' },
          paymentIntentId: { type: 'string' },
        },
      },
    },
  };

  const confirmPaymentSchema = {
    body: {
      type: 'object',
      required: ['paymentIntentId'],
      properties: {
        paymentIntentId: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          status: { type: 'string' },
          paymentIntent: { type: 'object' },
        },
      },
    },
  };

  // Criar PaymentIntent
  fastify.post('/create-payment-intent', {
    schema: {
      ...createPaymentIntentSchema,
      tags: ['payments'],
      summary: 'Criar PaymentIntent',
      description: 'Cria um PaymentIntent do Stripe para processar pagamento',
    },
    handler: paymentController.createPaymentIntent.bind(paymentController),
  });

  // Confirmar pagamento
  fastify.post('/confirm-payment', {
    schema: {
      ...confirmPaymentSchema,
      tags: ['payments'],
      summary: 'Confirmar pagamento',
      description: 'Confirma um pagamento processado pelo Stripe',
    },
    handler: paymentController.confirmPayment.bind(paymentController),
  });
}
