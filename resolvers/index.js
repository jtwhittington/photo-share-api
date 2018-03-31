const Query = require('./Query')
const Mutation = require('./Mutation')
const Photo = require('./Photo')
const User = require('./User')
const DateTime = require('./DateTime')
const Subscription = require('./Subscription')
const { GraphQLUpload } = require('apollo-upload-server')

module.exports = {
    Query,
    Mutation,
    Subscription,
    Photo,
    User,
    DateTime,
    Upload: GraphQLUpload
}