import { mongoose } from 'mongoose'

const otpModel = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  otp: {
    type: [String],
    required: true,
  },
  isValid: {
    type: Boolean,
    default: false,
  },
  ValidUpto: {
    type: Date,
    default: Date.now(),
    expires: 300,
  },

}, {Timestamp: true})

export default mongoose.model('Otp', otpModel);