const mongoose = require('mongoose');
const BoekSchema = require ('./schemas/boek');
const CategorieSchema = require ('./schemas/categorie');
const UserSchema = require ('./schemas/user');
const Boek = mongoose.model('Boek', BoekSchema);
const Categorie = mongoose.model('Categorie', CategorieSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
  Boek,
  Categorie,
  User
}