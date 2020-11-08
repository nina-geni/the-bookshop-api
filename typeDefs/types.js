/**
 * The GraphQL types
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  scalar Date

  enum Taal {
    Nederlands,
    Engels,
    Frans,
    Duits
  }

  enum Uitvoering {
    Paperback,
    Hardcover,
    Ebook,
    Pocketboek
  }

  type Categorie {
    id: ID!
    naam: String!
  }

  type Afbeelding {
    filenaam: String
    mimetype: String
    encoding: String
  }

  type Boek {
    id: ID!
    titel: String!
    beschrijving: String
    auteur: String!
    prijs: Float!
    verschijningsdatum: String
    toevoegingsdatum: Date
    categories: [Categorie!]
    afbeelding: String
    taal: Taal!
    uitvoering: Uitvoering!
  }

  type AuthData {
    userId: ID
    token: String
  }

  type User {
    id: ID!
    email: String
    password: String
    isAdmin: Boolean
  }
`