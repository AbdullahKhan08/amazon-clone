import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  },
  { timestamps: true }
)

export const User = mongoose.model('User', userSchema)
