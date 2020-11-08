const mongoose = require('mongoose');
const CategorieSchema = require('./categorie');

const BoekSchema = new mongoose.Schema({
  titel: String,
  beschrijving: String,
  auteur: String,
  prijs: Number,
  verschijningsdatum: String,
  toevoegingsdatum: Date,
  afbeelding: String,
  taal: String,
  uitvoering: String,
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorie"
  }],
});

module.exports = BoekSchema;