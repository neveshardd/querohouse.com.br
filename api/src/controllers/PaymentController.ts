import { FastifyRequest, FastifyReply } from 'fastify';
import { PaymentService } from '../services/PaymentService';

export class PaymentController {
  async createPaymentIntent(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { amount, planId } = request.body as { amount: number; planId: string };

      if (!amount || !planId) {
        return reply.status(400).send({
          success: false,
          error: 'Amount e planId são obrigatórios'
        });
      }

      const paymentIntent = await PaymentService.createPaymentIntent(amount);

      return reply.send({
        success: true,
        clientSecret: paymentIntent.clientSecret,
        paymentIntentId: paymentIntent.id,
      });
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  }

  async confirmPayment(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { paymentIntentId } = request.body as { paymentIntentId: string };

      if (!paymentIntentId) {
        return reply.status(400).send({
          success: false,
          error: 'PaymentIntentId é obrigatório'
        });
      }

      const result = await PaymentService.confirmPayment(paymentIntentId);

      return reply.send({
        success: result.success,
        status: result.status,
        paymentIntent: result.paymentIntent,
      });
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: 'Erro interno do servidor'
      });
    }
  }
}
