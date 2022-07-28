import { create } from 'domain'
import mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true }
}, {
    timestamps: true
})