import express from 'express'
import { Response } from 'express'
const ordersRouter = express.Router()
import dotenv from 'dotenv'
dotenv.config()
import { User } from '../models/User'
import { Order } from '../models/Order'
import {
  AuthenticatedRequest,
  ExtendedJwtPayload,
  userAuthentication,
} from './user'

ordersRouter.post(
  '/create',
  userAuthentication,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userObject = req.user as ExtendedJwtPayload
      const { basket, totalAmount } = req.body

      if (userObject.email) {
        const email = userObject.email
        const user = await User.findOne({ email })

        if (!user) {
          return res.status(404).json({ message: 'User not found' })
        }
        console.log(basket)

        console.log(user)
        console.log(typeof totalAmount)

        const newOrder = new Order({
          basket: basket,
          totalAmount: totalAmount,
        })

        const savedOrder = await newOrder.save()

        // Add the order ID to the user's orders array
        user.orders.push(savedOrder._id)

        // Save the user to update the orders array
        await user.save()

        return res
          .status(201)
          .json({ message: 'Order added successfully', user })
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
)

ordersRouter.get(
  '/fetchOrders',
  userAuthentication,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userObject = req.user as ExtendedJwtPayload

      if (userObject.email) {
        const email = userObject.email
        const user = await User.findOne({ email })

        if (!user) {
          return res.status(404).json({ message: 'User not found' })
        }

        await user.populate({
          path: 'orders',
          options: { sort: { createdAt: -1 } },
        })

        const orders = user.orders

        if (orders.length === 0) {
          return res
            .status(404)
            .json({ message: 'this user does not have any orders' })
        }

        return res.status(200).json({ orders: orders, status: 'successfull' })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
)

export default ordersRouter
