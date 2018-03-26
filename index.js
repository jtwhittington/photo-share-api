const { GraphQLServer, PubSub } = require('graphql-yoga')
const fs = require('fs')
const { MongoClient } = require('mongodb')

require('dotenv').config()

const resolvers = require('./resolvers')
const typeDefs = fs.readFileSync('./typeDefs.graphql', 'UTF-8')

const start = async () => {
    
    const client = await MongoClient.connect(process.env.DB_HOST)
    const db = client.db()
    const pubsub = new PubSub()

    const context = async ({ request, connection }) => {

        var auth = request ? 
            request.headers.authorization : 
            connection ? 
                connection.context.Authorization : 
                null
                
        var githubToken = auth && auth.replace('bearer ', '')

        return { 
            pubsub,
            photos: db.collection('photos'), 
            users: db.collection('users'),
            tags: db.collection('tags'),
            user: await db.collection('users').findOne({ githubToken })
        }

    }
    
    const server = new GraphQLServer({ typeDefs, resolvers, context })

    server.express.get('/', (req, res) => {
        let url = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user`
        res.end(`
            <a href="${url}">Sign In with Github</a>
        `)
    })
    
    const options = {
        port: 4000,
        endpoint: '/graphql',
        playground: '/playground',
        subscriptions: '/subscriptions'
    }
    
    const ready = ({ port }) => console.log(`graph service running - http://localhost:${port}`)
    
    server.start(options, ready)
}

start()