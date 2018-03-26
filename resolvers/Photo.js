const { findBy } = require('../lib')
const { ObjectID } = require('mongodb')

module.exports = {

    id: root => root.id || root._id,
    
    url: root => `/img/photos/${root._id}.jpg`,
    
    postedBy: (root, args, { users }) => users.findOne({ _id: ObjectID(root.userID) }),
    
    async taggedUsers(root, args, { tags, users }) {

        const photoTags = await tags
            .find({ photoID: root._id.toString() })
            .toArray()

        const userIDs = photoTags
            .map(tag => tag.userID)
            .map(id => ObjectID(id))
        
        return users.find({_id: { $in: userIDs }}).toArray()

    }
    
}