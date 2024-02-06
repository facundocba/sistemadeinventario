const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: String,
  },
  { timestamps: true }
);

// Agrega la paginación al esquema
ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;



