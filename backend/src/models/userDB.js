import { mongoose } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

// creating Model
const userModel = mongoose.model('user-db', userSchema);

export { userModel };
