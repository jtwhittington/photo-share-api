const { v4 } = require('uuid')
const { findBy } = require('../lib')

module.exports = {

    postPhoto(root, args, { photos, user }) {

        if (!user) {
            throw new Error('only an authorized user can post a photo')
        }

        const newPhoto = {
            id: v4(),
            ...args.input,
            userID: user.id,
            created: new Date()
        }

        photos.push(newPhoto)

        return newPhoto
    },

    tagPhoto: (root, { userID, photoID }, { tags, photos }) => {
        
        tags.push({ userID, photoID })        
        
        return findBy(photoID, photos)
    }

}