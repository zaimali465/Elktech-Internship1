import Joi from 'joi'

export const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required().messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters',
            'string.max': 'Name must be less than 50 characters',
        }),
        email: Joi.string().email().required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Email must be a valid email address',
        }),
        password: Joi.string()
            .min(6)
            .max(100)
            .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'))
            .required()
            .messages({
                'string.empty': 'Password is required',
                'string.min': 'Password must be at least 6 characters',
                'string.max': 'Password must be less than 100 characters',
                'string.pattern.base': 'Password must contain at least one letter and one number',
            }),
    })

    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
        const errors = error.details.map((detail) => detail.message)
        return res.status(400).json({ message: 'Validation error', errors })
    }
    next()
}

export const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Email must be a valid email address',
        }),
        password: Joi.string().min(4).max(100).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 4 characters',
            'string.max': 'Password must be less than 100 characters',
        }),
    })

    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
        const errors = error.details.map((detail) => detail.message)
        return res.status(400).json({ message: 'Validation error', errors })
    }
    next()
}