import { Schema, model, models } from 'mongoose';

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
});

export const OTP = models.OTP || model('OTP', otpSchema);