module.exports = {
    newPhoto: {
        subscribe: (root, data, { pubsub }) => pubsub.asyncIterator('photo-added')
    },
    newUser: {
        subscribe: (root, data, { pubsub }) => pubsub.asyncIterator('user-added')
    }
}