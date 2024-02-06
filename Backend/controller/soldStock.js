const Sales = require("../models/sales");
const Product = require("../models/product");

const updateSoldStock = async (productID, stockSoldData) => {
  try {
    const productData = await Product.findOne({ _id: productID });

    if (!productData) {
      throw new Error("Product not found");
    }

    const updatedStock = productData.stock - stockSoldData;
    console.log("Updated Sold Stock: ", updatedStock);

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: productID },
      {
        stock: updatedStock,
      },
      { new: true }
    );

    console.log("Updated Product: ", updatedProduct);
  } catch (error) {
    console.error("Error updating sold stock: ", error.message);
    throw error; // Puedes decidir lanzar el error o manejarlo según tus necesidades.
  }
};

module.exports = updateSoldStock;
