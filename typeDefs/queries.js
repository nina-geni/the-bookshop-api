/**
 * The GraphQL queries
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    boeken:[Boek]
    boek(id:ID):Boek
    categories:[Categorie]
    categorie(id:ID):Categorie
    login(user:UserInput):AuthData
    users:[User]
    user(id:ID):User
  }
`