import express from 'express'
import { Request, Response, NextFunction } from 'express'
const paymentRouter = express.Router()
import dotenv from 'dotenv'
dotenv.config()
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET as string)

paymentRouter.post('/create', async (req: Request, res: Response) => {
  const total = req.query.total as string
  console.log(total)
  console.log('type', typeof total)

  try {
    const customer = await stripe.customers.create({
      name: 'Jenny Rosen',
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
    })

    const paymentIntent = await stripe.paymentIntents.create({
      description: 'Software development services',
      shipping: {
        name: 'Jenny Rosen',
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      },
      amount: parseInt(total),
      currency: 'usd',
      payment_method_types: ['card'],
    })
    // console.log(paymentIntent.payment_method)

    res.status(201).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    // console.log(error)
  }

  console.log('Payment request recieved !!! for amount-> ', total)
})

paymentRouter.get('/test', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Working fine' })
})

export default paymentRouter
