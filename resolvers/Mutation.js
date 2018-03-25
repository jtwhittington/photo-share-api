const { v4 } = require('uuid')

module.exports = {
    postPhoto(root, args, { photos, user }) {

        if (!user) {
            throw new Error('only an authorized user can post a photo')
        }

        const newPhoto = {
            id: v4(),
            ...args.input,
            userID: user.id
        }

        photos.push(newPhoto)

        return newPhoto
    }
}