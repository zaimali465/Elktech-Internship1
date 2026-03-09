import mongoose from 'mongoose'

const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, "Name can't exceed 50 characters"],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
}, {
    timestamps: true,
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel