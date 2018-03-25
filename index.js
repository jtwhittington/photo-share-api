const { GraphQLServer } = require('graphql-yoga')
const fs = require('fs')

const resolvers = require('./resolvers')
const typeDefs = fs.readFileSync('./typeDefs.graphql', 'UTF-8')

const server = new GraphQLServer({ typeDefs, resolvers })

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