import mongoose from "mongoose";

const{Schema} = mongoose;

const usersSchema = new Schema ({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true, select: false}
  });

  const usersConnection = mongoose.createConnection('mongodb://localhost:27017/Users');

  const Users = usersConnection.model("Usuarios", usersSchema);

  export default Users;