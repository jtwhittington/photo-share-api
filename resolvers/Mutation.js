const { findBy } = require('../lib')
const fetch = require('node-fetch')

module.exports = {

    async postPhoto(root, args, { photos, user }) {

        if (!user) {
           throw new Error('only an authorized user can post a photo')
        }

        const newPhoto = {
            ...args.input,
            userID: user._id,
            created: new Date()
        }

        const { insertedIds } = await photos.insert(newPhoto)
        newPhoto.id = insertedIds[0]

        return newPhoto

    },

    async addFakeUsers(root, {count}, { users }) {
        
        var { results } = await fetch(`https://randomuser.me/api/?results=${count}`)
            .then(res => res.json())
        
        var fakeUsers = results.map(r => ({
          githubLogin: r.login.username,
          name: `${r.name.first} ${r.name.last}`,
          avatar: r.picture.thumbnail,
          githubToken: r.login.sha1
        }))

        await users.insert(fakeUsers)
        var newUsers = await users.find().sort({ _id: -1 }).limit(count).toArray()

        return newUsers
    },

    tagPhoto: (root, { userID, photoID }, { tags, photos }) => {
        
        tags.push({ userID, photoID })        
        
        return findBy(photoID, photos)
    }

}