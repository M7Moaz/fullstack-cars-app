const db = require("mongoose");
const brandSchema = new db.Schema({
  title: {
    type: String,
    required: true,
  },
  href: {
    type: String,
  },
  logo: {
    type: String,
    required: true,
    default: "kia.png",
  },
  image: {
    type: String,
    required: true,
    default: "kia.png",
  },
});

brandSchema.pre("save", function (next) {
  if (!this.href) {
    this.href = `/brand/${this.title.toLowerCase()}`;
  }
  next();
});

module.exports = db.model("Brand", brandSchema);
