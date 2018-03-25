const { findBy } = require('../lib')

module.exports = {
    postedPhotos: ({id}, args, {photos}) => photos.filter(p => p.userID === id),
    inPhotos: (root, args, { tags, photos }) => tags
        .filter(tag => tag.userID === root.id)
        .map(tag => tag.photoID)
        .map(photoID => photos.map(x=>x.id).indexOf(photoID))
        .map(index => photos[index])
}