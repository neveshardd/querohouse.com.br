"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = paymentRoutes;
const PaymentController_1 = require("../controllers/PaymentController");
async function paymentRoutes(fastify) {
    const paymentController = new PaymentController_1.PaymentController();
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
    fastify.post('/create-payment-intent', {
        schema: {
            ...createPaymentIntentSchema,
            tags: ['payments'],
            summary: 'Criar PaymentIntent',
            description: 'Cria um PaymentIntent do Stripe para processar pagamento',
        },
        handler: paymentController.createPaymentIntent.bind(paymentController),
    });
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
//# sourceMappingURL=payments.js.map