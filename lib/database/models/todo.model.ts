import mongoose, { Schema, model, models } from "mongoose"

const TodoSchema = new Schema({
    creator: { type: mongoose.Types.ObjectId, required: true },
    task: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
})

const Todo = models.Todo || model('Todo', TodoSchema);
export default Todo;