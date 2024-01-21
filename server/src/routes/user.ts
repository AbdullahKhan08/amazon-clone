import express from 'express'
import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { User } from '../models/User'
import bcrypt from 'bcrypt'
const userRouter = express.Router()
import dotenv from 'dotenv'
dotenv.config()
const USER_SECRET = process.env.USER_SECRET

export interface ExtendedJwtPayload extends JwtPayload {
  email?: string | undefined
  role?: string | undefined
}

export interface AuthenticatedRequest extends Request {
  user?: string | ExtendedJwtPayload | undefined
}

export const userAuthentication = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Forbidden' })
  } else {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, USER_SECRET as string, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'authentication Failed' })
      } else {
        req.user = user as ExtendedJwtPayload
        next()
      }
    })
  }
}

userRouter.get(
  '/me',
  userAuthentication,
  async (req: AuthenticatedRequest, res) => {
    const userObject = req.user as ExtendedJwtPayload
    if (userObject.email) {
      const email = userObject.email
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(403).json({ message: 'User does not exist' })
      } else {
        const name = user?.name
        console.log(name)
        console.log(user)

        return res.status(200).json({ name, email })
      }
    }
  }
)

userRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all the details' })
  }

  const existingUser = await User.findOne({ email })

  if (!existingUser) {
    bcrypt.hash(password, 10, async (error, hash) => {
      if (error) {
        console.log(error)

        return res
          .status(500)
          .json({ message: 'Internal server error', error: error })
      }

      const newUser = new User({ name, email, password: hash })

      try {
        await newUser.save()
        const token = jwt.sign({ email, role: 'user' }, USER_SECRET as string, {
          expiresIn: '48h',
        })
        return res.status(201).json({
          message: 'User account created successfully',
          token,
          name: newUser.name,
          email: newUser.email,
        })
      } catch (error) {
        console.log(error)

        return res
          .status(500)
          .json({ message: 'Internal server error', error: error })
      }
    })
  } else {
    return res.status(403).json({ message: 'User already exists' })
  }
})
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Provide all the details' })
  }

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    bcrypt.compare(password, existingUser.password as string, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' })
      }
      if (result) {
        const token = jwt.sign({ email, role: 'user' }, USER_SECRET as string, {
          expiresIn: '48h',
        })
        return res.status(200).json({
          message: 'Logged in successfully',
          token,
          name: existingUser.name,
          email: existingUser.email,
        })
      } else {
        return res.status(403).json({ msg: 'Invalid username or password' })
      }
    })
  } else {
    return res.status(403).json({ message: 'Invalid username or pasword' })
  }
})

export default userRouter
