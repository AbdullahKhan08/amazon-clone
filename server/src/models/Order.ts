import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  basket: [
    {
      title: { type: String },
      image: { type: String },
      price: { type: Number },
      rating: { type: Number },
    },
  ],
  totalAmount: { type: Number },
  createdAt: { type: Date, default: Date.now },
})

export const Order = mongoose.model('Order', orderSchema)
