/**
 * A GraphQL template
 * More Information: https://graphql.org/
 */

/**
 * Importing some libraries
 */

const  { ApolloServer } = require('apollo-server');
const dotenv = (require('dotenv')).config();
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// create an apollo server instance

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: (({ req }) => {
    // console.log(req);
  })
});

server
  .listen({
    port: process.env.PORT || process.env.GRAPHQL_PORT || 4000
  })
  .then(({ url }) => {
    console.log(`Server started at ${url}`);
  });