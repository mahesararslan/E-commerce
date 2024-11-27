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
    },
  ],
});

export const User =  models.CustomUser || model('CustomUser', customUserSchema);
