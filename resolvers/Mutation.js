const { findBy } = require('../lib')
const { ObjectID } = require('mongodb')
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

    async tagPhoto(root, newTag, { tags, photos }) {
        
        await tags.update(newTag, newTag, { upsert: true })
        
        return photos.findOne({ _id: ObjectID(newTag.photoID)}) 
    
    },

    async githubAuth(root, { code }, { users }) {
        
        var { message, access_token, avatar_url, login, name } = await authorizeWithGithub({
            client_id: 'deba4977ddbd7ceee828',
            client_secret: 'a2011f345ed346af36bc1c471973e1ddae3e04d9',
            code
        })

        if (message) {
            throw new Error(message)
        }

        var newUser = {
            name,
            githubLogin: login,
            githubToken: access_token,
            avatar: avatar_url
        }

		var user = await users.findOne({ githubLogin: login })
        
		if (user) {
            
            const { value } = await users.findOneAndUpdate({ login }, newUser)
            user = value
        
        } else {
        
			var { insertedIds } = await users.insert(newUser)
			newUser.id = insertedIds[0]
            user = newUser
            
        }

        return { user, token: access_token }
        
	}

}