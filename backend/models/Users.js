const db = require("mongoose");

const userSchema = new db.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "ADMIN",
  },
});

module.exports = db.model("User", userSchema);
