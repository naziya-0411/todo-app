import { mongoose } from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    preference: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    isCompleted: {
      type: Boolean,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user-db',
      required: true,
    },
  },
  { timestamps: true }
);

// creating Model
const taskModel = mongoose.model('todo-db', taskSchema);

export { taskModel };
