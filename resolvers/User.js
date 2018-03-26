const { findBy } = require('../lib')
const { ObjectID } = require('mongodb')

module.exports = {

    id: root => root.id || root._id,

    postedPhotos: (root, args, { photos }) => photos.find({ userID: root._id }).toArray(),
    
    async inPhotos(root, args, { tags, photos }) {

        const userTags = await tags
            .find({ userID: root._id.toString() })
            .toArray()

        const  photoIDs = userTags
            .map(tag => tag.photoID)
            .map(id => ObjectID(id))

        return photos.find({_id: { $in: photoIDs }}).toArray()
        
    }

}