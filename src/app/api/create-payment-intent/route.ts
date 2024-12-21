import { NextRequest, NextResponse } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
    try {
        const { amount } = await req.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true}, // This is a new feature in Stripe which allows you to automatically charge the customer's payment method when the payment intent is created
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret
        })
    }
    catch (error) {
        return NextResponse.json({
            error: error,
            status: 500,
        })
    }
}
