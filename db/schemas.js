const mongoose = require("./db_connection");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  created: { type: Date, default: Date.now },
  owner: {type: Schema.Types.ObjectId, ref: "User"},
  content: { type: String, required: true },
  users: [{type: Schema.Types.ObjectId, ref: "User"}],
});

const UserSchema = new Schema({
  created: { type: Date, default: Date.now },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, required: true },
});

module.exports = {
  Item: mongoose.model("Item", ItemSchema),
  User: mongoose.model("User", UserSchema),
};
