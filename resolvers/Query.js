const { findBy } = require('../lib')

module.exports = {
    totalPhotos: (root, args, ctx) => ctx.photos.length,
    allPhotos: (root, args, ctx) => ctx.photos,
    Photo: (root, args, ctx) => findBy(args.id, ctx.photos),
    totalUsers: (root, args, ctx) => ctx.users.length,
    allUsers: (root, args, ctx) => ctx.users,
    User: (root, args, ctx) => findBy(args.id, ctx.users)
}