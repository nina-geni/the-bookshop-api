/**
 * The GraphQL mutations
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  type Mutation {
    addBoek(boek: BoekInput):Boek
    deleteBoek(boekId:ID):Boek
    updateBoek(boek: BoekInput, boekId:ID):Boek
    addCategorie(categorie: CategorieInput):Categorie
    updateCategorie(categorie: CategorieInput, categorieId:ID):Categorie
    deleteCategorie(categorieId:ID):Categorie
    register(user: UserInput):User
  }
`