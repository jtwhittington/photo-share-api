const { findBy } = require('../lib')

module.exports = {
    postedPhotos: ({id}, args, {photos}) => photos.filter(p => p.userID === id)
}