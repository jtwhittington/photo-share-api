const { findBy } = require('../lib')

module.exports = {
    url: root => `/img/photos/${root.id}.jpg`,
    postedBy: (root, args, { users }) => findBy(root.userID, users),
    taggedUsers: (root, args, { tags, users }) => tags 
        .filter(tag => tag.photoID === root.id)  
        .map(tag => tag.userID)
        .map(userID => users.map(x=>x.id).indexOf(userID))
        .map(index => users[index])
}