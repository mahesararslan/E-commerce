import mongoose, { models, model, Schema } from 'mongoose'

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: { 
        type: [String],
        required: true 
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    isOnSale: {
        type: Boolean,
        default: false
    },
    salePrice: {
        type: Number
    },
    rating: {
        type: Number,
        default: 4.5
    },
    reviews: [
        {
            userName: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            review: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

export const Product = models.Product || model('Product', ProductSchema)