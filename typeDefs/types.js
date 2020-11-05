/**
 * The GraphQL types
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  scalar Date

  #enum Status {
  #  READ,
  #  INTERESTED,
  #  NEVER_READ
  #}

  type Dummy {
    id: ID!
  }
`