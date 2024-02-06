const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const SaleSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    ProductID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    StoreID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "store",
      required: true,
    },
    StockSold: {
      type: Number,
      required: true,
    },
    SaleDate: {
      type: String,
      required: true,
    },
    TotalSaleAmount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Agrega la paginación al esquema
SaleSchema.plugin(mongoosePaginate);

const Sale = mongoose.model("Sale", SaleSchema);
module.exports = Sale;
