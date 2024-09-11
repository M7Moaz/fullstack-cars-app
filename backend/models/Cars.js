const db = require("mongoose");
const carSchema = new db.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    colors: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
      default: [{ url: "/ferrari.png" }],
    },
    price: {
      type: Number,
      required: true,
    },
    hasOffer: {
      type: Boolean,
      required: false,
      default: false,
    },
    offerPrice: {
      type: Number || null,
      required: false,
      default: null,
    },
    category: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    engine: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: false,
      default: "Dubai",
    },
  },
  { timestamps: true }
);

module.exports = db.model("Car", carSchema);
