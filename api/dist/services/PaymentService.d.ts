import Stripe from 'stripe';
export declare class PaymentService {
    static createPaymentIntent(amount: number, currency?: string): Promise<{
        clientSecret: string | null;
        id: string;
    }>;
    static confirmPayment(paymentIntentId: string): Promise<{
        success: boolean;
        paymentIntent: Stripe.Response<Stripe.PaymentIntent>;
        status?: undefined;
    } | {
        success: boolean;
        status: "canceled" | "processing" | "requires_action" | "requires_capture" | "requires_confirmation" | "requires_payment_method";
        paymentIntent?: undefined;
    }>;
}
//# sourceMappingURL=PaymentService.d.ts.map