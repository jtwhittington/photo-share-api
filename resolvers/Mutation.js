module.exports = {
    postPhoto(root, args, { photos }) {
        photos.push(args)
        return args
    }
}