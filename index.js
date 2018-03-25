const { GraphQLServer } = require('graphql-yoga')
const fs = require('fs')
const users = require('./data/sample-users')
const photos = require('./data/sample-photos')

const resolvers = require('./resolvers')
const typeDefs = fs.readFileSync('./typeDefs.graphql', 'UTF-8')

const context = { photos, users }

const server = new GraphQLServer({ typeDefs, resolvers, context })

server.express.get('/', (req, res) => {
    res.end('Welcome to the PhotoShare API')
})

const options = {
    port: 4000,
    endpoint: '/graphql',
    playground: '/playground'
}

const ready = ({ port }) => console.log(`graph service running - http://localhost:${port}`)

server.start(options, ready)