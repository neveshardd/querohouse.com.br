"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = process.env.STRIPE_SECRET_KEY
    ? new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-09-30.clover',
    })
    : null;
class PaymentService {
    static async createPaymentIntent(amount, currency = 'brl') {
        if (!stripe) {
            throw new Error('Stripe não configurado. Verifique a variável STRIPE_SECRET_KEY');
        }
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100),
                currency,
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            return {
                clientSecret: paymentIntent.client_secret,
                id: paymentIntent.id,
            };
        }
        catch (error) {
            console.error('Erro ao criar PaymentIntent:', error);
            throw new Error('Falha ao processar pagamento');
        }
    }
    static async confirmPayment(paymentIntentId) {
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
        }
        catch (error) {
            console.error('Erro ao confirmar pagamento:', error);
            throw new Error('Falha ao confirmar pagamento');
        }
    }
}
exports.PaymentService = PaymentService;
//# sourceMappingURL=PaymentService.js.map