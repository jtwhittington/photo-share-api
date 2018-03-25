const { findBy } = require('../lib')

module.exports = {
    url: root => `/img/photos/${root.id}.jpg`,
    postedBy: (root, args, { users }) => findBy(root.userID, users)
}