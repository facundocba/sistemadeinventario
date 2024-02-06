// models/index.js
const mongoose = require('mongoose');
const Product = require('./product');
const Store = require('./store');
const Purchase = require('./purchase');
const Sales = require('./sales');
const Users = require('./users');

const uri = "mongodb+srv://Foley20:facufoley20@cluster0.m9an47k.mongodb.net/APP_INVENTARIO?retryWrites=true&w=majority";

// Configurar opciones de conexión a la base de datos
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function main() {
  try {
    await mongoose.connect(uri, options);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

module.exports = {
  main,
  Product,
  Store,
  Purchase,
  Sales,
  Users,
};
