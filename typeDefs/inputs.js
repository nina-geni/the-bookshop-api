/**
 * The GraphQL inputs
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  input BoekInput {
    titel: String
    beschrijving: String
    auteur: String
    prijs: Float
    verschijningsdatum: String
    afbeelding: String
    taal: Taal
    uitvoering: Uitvoering,
    categories: [CategorieIdInput]
  }

  input CategorieInput {
    naam: String
  }

  input CategorieIdInput {
    id: ID
  }

  input UserInput {
    email: String
    password: String
  }
`