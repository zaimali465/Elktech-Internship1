import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import { DB_NAME } from '../constants.js'

const connectDB = async() => {
    console.log('Connecting to MongoDB before...')

    try {
        console.log('Connecting to MongoDB...', process.env.MONGODB_URI)
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/abc`
        )

        console.log(`\n Mongo DB connected succesfull !! 
        DB Host: ${connectionInstance.connection.host} `)
    } catch (error) {
        console.error('Mongo DB connection Error', error)
        process.exit(1)
    }
}

export default connectDB