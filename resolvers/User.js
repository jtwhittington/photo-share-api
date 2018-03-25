const { findBy } = require('../lib')

module.exports = {

    id: root => root.id || root._id,

    postedPhotos: (root, args, { photos }) => photos.find({ userID: root._id }).toArray(),
    
    inPhotos: (root, args, { tags, photos }) => []

}