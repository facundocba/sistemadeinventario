const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const PurchaseSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    ProductID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Usa la misma capitalización que en el modelo de producto
      required: true,
    },
    QuantityPurchased: {
      type: Number,
      required: true,
    },
    PurchaseDate: {
      type: String,
      required: true,
    },
    TotalPurchaseAmount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Agrega la paginación al esquema
PurchaseSchema.plugin(mongoosePaginate);

const Purchase = mongoose.model("Purchase", PurchaseSchema);

module.exports = Purchase;
