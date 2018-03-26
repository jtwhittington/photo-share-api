const { GraphQLServer } = require('graphql-yoga')
const fs = require('fs')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')

require('dotenv').config()

const resolvers = require('./resolvers')
const typeDefs = fs.readFileSync('./typeDefs.graphql', 'UTF-8')

const start = async () => {
    
    const client = await MongoClient.connect(process.env.DB_HOST)
    const db = client.db()

    const context = async ({ request }) => {

        var auth = request.headers.authorization
        var githubToken = auth && auth.replace('bearer ', '')

        return { 
            photos: db.collection('photos'), 
            users: db.collection('users'),
            tags: db.collection('tags'),
            user: await db.collection('users').findOne({ githubToken })
        }

    }
    
    const server = new GraphQLServer({ typeDefs, resolvers, context })
    
    server.express.use(bodyParser.json())
    server.express.use((req, res, next) => {

        const { query, operationName, variables } = req.body
        let message = (query && operationName) ? 
            `GraphQL Request ${operationName}` : 
            `HTTP Request ${req.method} for ${req.url}`

        if (variables) {
            message += ` with variables: {${Object.keys(variables).join(', ')}}`
        }    

        console.log(message)

        next()
        
    })

    server.express.get('/', (req, res) => {
        let url = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user`
        res.end(`
            <a href="${url}">Sign In with Github</a>
        `)
    })
    
    const options = {
        port: 4000,
        endpoint: '/graphql',
        playground: '/playground'
    }
    
    const ready = ({ port }) => console.log(`graph service running - http://localhost:${port}`)
    
    server.start(options, ready)
}

start()