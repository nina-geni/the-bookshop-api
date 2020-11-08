/**
 * The Subscription Resolvers
 */

 const pubsub = require('./pubsub');

module.exports = {
  Subscription: {
    // e.g. dummyAdded: { subscribe: () => pubsub.asyncIterator("DUMMY_ADDED") }
    boekAdded: { subscribe: () => pubsub.asyncIterattor("BOEK_ADDED")}
  }
}