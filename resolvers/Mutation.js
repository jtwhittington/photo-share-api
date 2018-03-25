const { v4 } = require('uuid')

module.exports = {
    postPhoto(root, args, { photos }) {
        const newPhoto = {
            id: v4(),
            ...args.input
        }
        photos.push(newPhoto)
        return newPhoto
    }
}