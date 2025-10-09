import {mongoose} from 'mongoose'

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        require: true
    },
    preference: {
        type: String,
        require: true,
    },
    tags: {
        type: Array,
    },
    isCompleted: {
        type: Boolean,
        require: true,
    },
    createdAt: {
        type: Date,
        require: true,
    },
    updatedAt: {
        type: Date,
        require: true,
    }
});

// creating Model
const taskModel = mongoose.model("todo-db", taskSchema);

export{
    taskModel
}




