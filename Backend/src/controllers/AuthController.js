import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../models/user.js'
import dotenv from 'dotenv'

dotenv.config()

export const signup = async(req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false,
            })
        }

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists, you can login',
                success: false,
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new UserModel({
            name,
            email,
            password: hashedPassword,
        })

        await user.save()

        res.status(201).json({
            message: 'Signup successful',
            success: true,
        })
    } catch (err) {
        console.error(err)

        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map((e) => e.message)
            return res
                .status(400)
                .json({ message: 'Validation error', errors, success: false })
        }
        res.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body
        console.log(' ~ login ~ email:', email)

        console.log(' ~ login ~ UserModel:', UserModel)
        const user = await UserModel.findOne({ email })
        console.log(' ~ login ~ user: ===>', user)
        const errorMsg = 'Auth failed: email or password is wrong'
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false })
        }

        const isPassEqual = await bcrypt.compare(password, user.password)
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false })
        }
        console.log('~ login ~ isPassEqual:', process.env.JWT_SECRET)

        const jwtToken = jwt.sign({ email: user.email, _id: user._id },
            process.env.JWT_SECRET, { expiresIn: '24h' }
        )
        console.log('~ login ~ jwtToken:', jwtToken)

        res.status(200).json({
            message: 'Login successful',
            success: true,
            jwtToken,
            email,
            name: user.name,
        })
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
        })
    }
}