"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const PaymentService_1 = require("../services/PaymentService");
class PaymentController {
    async createPaymentIntent(request, reply) {
        try {
            const { amount, planId } = request.body;
            if (!amount || !planId) {
                return reply.status(400).send({
                    success: false,
                    error: 'Amount e planId são obrigatórios'
                });
            }
            const paymentIntent = await PaymentService_1.PaymentService.createPaymentIntent(amount);
            return reply.send({
                success: true,
                clientSecret: paymentIntent.clientSecret,
                paymentIntentId: paymentIntent.id,
            });
        }
        catch (error) {
            return reply.status(500).send({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    }
    async confirmPayment(request, reply) {
        try {
            const { paymentIntentId } = request.body;
            if (!paymentIntentId) {
                return reply.status(400).send({
                    success: false,
                    error: 'PaymentIntentId é obrigatório'
                });
            }
            const result = await PaymentService_1.PaymentService.confirmPayment(paymentIntentId);
            return reply.send({
                success: result.success,
                status: result.status,
                paymentIntent: result.paymentIntent,
            });
        }
        catch (error) {
            return reply.status(500).send({
                success: false,
                error: 'Erro interno do servidor'
            });
        }
    }
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=PaymentController.js.map