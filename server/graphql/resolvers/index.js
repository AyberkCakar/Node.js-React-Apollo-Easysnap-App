// query resplvers
const Query = require('./queries/Query');
const Snap = require('./queries/Snap');
const User = require('./queries/User');

// mutations resolvers
const Mutation = require('./mutations/index');

// Subscription resolvers
const Subscription = require('./subscriptions/index');

module.exports = {
  Query,
  Snap,
  User,
  Mutation,
  Subscription
};