import { model, models, Schema } from "mongoose";

const customUserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    default: null,
    required: false,
  },
  image: {
    type: String,
    default: null,
  },
  recentSearches: [
    {
      type: String, 
      default: []
    },
  ],
  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      default: [],
    },
  ],
  cart: [
    {
      _id: false,
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1, // Default quantity is 1
        min: 1, // Ensure minimum quantity is 1
      },
    },
  ],
});

export const User =  models.CustomUser || model('CustomUser', customUserSchema);
