const { findBy } = require('../lib')
const { ObjectID } = require('mongodb')

module.exports = {

    totalPhotos: (root, args, { photos }) => photos.count(),
    
    allPhotos: (root, args, { photos }) => photos.find().sort({ _id: -1 }).toArray(),
    
    Photo: (root, args, { photos }) => photos.findOne({ _id: ObjectID(args.id) }),
    
    totalUsers: (root, args, { users }) => users.count(),
    
    allUsers: (root, args, { users }) => users.find().toArray(),
    
    User: (root, args, { users }) => users.findOne({ _id: ObjectID(args.id) })

}