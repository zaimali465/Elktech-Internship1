import { Router } from 'express'
import { signup, login } from '../controllers/AuthController.js'
import {
    signupValidation,
    loginValidation,
} from '../middlewares/AuthValidation.js'

const router = Router()
router.post('/signup', signupValidation, signup)
router.post('/login', loginValidation, login)

export default router