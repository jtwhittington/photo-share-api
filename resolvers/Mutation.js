const { findBy } = require('../lib')

module.exports = {

    async postPhoto(root, args, { photos, user }) {

        if (!user) {
           throw new Error('only an authorized user can post a photo')
        }

        const newPhoto = {
            ...args.input,
            userID: user.id,
            created: new Date()
        }

        const { insertedIds } = await photos.insert(newPhoto)
        newPhoto.id = insertedIds[0]

        return newPhoto

    },

    tagPhoto: (root, { userID, photoID }, { tags, photos }) => {
        
        tags.push({ userID, photoID })        
        
        return findBy(photoID, photos)
    }

}