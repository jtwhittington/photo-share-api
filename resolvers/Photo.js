const { findBy } = require('../lib')

module.exports = {

    id: root => root.id || root._id,
    
    url: root => `/img/photos/${root.id}.jpg`,
    
    postedBy: (root, args, { users }) => ({ id: 'XYZ', name: 'Alex Banks' }),
    
    taggedUsers: (root, args, { tags, users }) => []
    
}