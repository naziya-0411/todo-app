import { mongoose } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
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
const userModel = mongoose.model('todo-db', userSchema);

export { userModel };
