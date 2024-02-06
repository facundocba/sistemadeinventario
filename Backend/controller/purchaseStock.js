const Purchase = require("../models/purchase");
const Product = require("../models/product");

const purchaseStock = async (productID, purchaseStockData) => {
  try {
    // Buscar el producto por su ID
    const myProductData = await Product.findOne({ _id: productID });

    if (!myProductData) {
      // Manejar el caso en que el producto no se encuentre
      console.error("Producto no encontrado");
      return;
    }

    // Actualizar el stock sumando la cantidad de la compra
    const myUpdatedStock = parseInt(myProductData.stock) + parseInt(purchaseStockData);

    // Actualizar el producto en la base de datos con el nuevo stock
    const updatedProduct = await Product.findByIdAndUpdate(
      productID,
      {
        stock: myUpdatedStock,
      },
      { new: true }
    );

    if (!updatedProduct) {
      // Manejar el caso en que no se pudo actualizar el producto
      console.error("No se pudo actualizar el producto");
      return;
    }

    // Registro de éxito
    console.log("Stock actualizado:", updatedProduct);
  } catch (error) {
    // Manejar errores
    console.error("Error actualizando el stock de compra", error);
  }
};

module.exports = purchaseStock;