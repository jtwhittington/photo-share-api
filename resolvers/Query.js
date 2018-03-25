module.exports = {
    totalPhotos: (root, args, ctx) => ctx.photos.length,
    allPhotos: (root, args, ctx) => ctx.photos
}