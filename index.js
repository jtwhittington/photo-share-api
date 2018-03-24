const { GraphQLServer } = require('graphql-yoga')
const fs = require('fs')

const resolvers = require('./resolvers')
const typeDefs = fs.readFileSync('./typeDefs.graphql', 'UTF-8')

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(
    () => console.log(`graph service running - http://localhost:4000`)
)