import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const amount = Number(body.amount)

    if (!process.env.STRIPE_SK_KEY) {
      throw createError({ statusCode: 500, statusMessage: 'Stripe secret key is not configured' })
    }

    if (!Number.isInteger(amount) || amount <= 0) {
      throw createError({ statusCode: 400, statusMessage: 'Amount must be a positive integer in cents' })
    }

    const stripe = new Stripe(process.env.STRIPE_SK_KEY);

    return await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
})
