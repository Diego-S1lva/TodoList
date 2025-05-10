import mongoose, { SchemaTypes } from "mongoose";
import login from "../Routes/login.js";
const {Schema} = mongoose;

const tasksSchema = new Schema({
    userId: {type:Schema.Types.ObjectId, ref: 'users', required: true},
    title: { type: String, required: true },
    description: { type: String },
    done: {type: Boolean, required: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  

  const tasksConnection = mongoose.createConnection('mongodb://localhost:27017/todolist');
  const TarefasSchemas = tasksConnection.model("tarefas", tasksSchema);
  export default TarefasSchemas;