module.exports = {
    userAdded: {
        subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('user createad')
    }
};