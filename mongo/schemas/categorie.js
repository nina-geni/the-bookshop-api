const mongoose = require('mongoose');

const CategorieSchema = new mongoose.Schema({
  naam: String
});

module.exports = CategorieSchema;