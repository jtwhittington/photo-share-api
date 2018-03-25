const { findBy } = require('../lib')
const { ObjectID } = require('mongodb')

module.exports = {

    id: root => root.id || root._id,
    
    url: root => `/img/photos/${root._id}.jpg`,
    
    postedBy: (root, args, { users }) => users.findOne({ _id: ObjectID(root.userID) }),
    
    taggedUsers: (root, args, { tags, users }) => []
    
}