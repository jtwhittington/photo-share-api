module.exports = {
    postPhoto(root, args, { photos }) {
        photos.push(args.input)
        return args.input
    }
}