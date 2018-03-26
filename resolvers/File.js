const { GraphQLScalarType } = require('graphql')

module.exports = new GraphQLScalarType({
    name: 'File',
    description: 'A binary file uploaded with multipart/form-data',
    parseValue: value => value,
    serialize: value => {
        throw new Error('File serialization not supported.')
    },
    parseLiteral: ast => {
        throw new Error('File parsing.')
    }
})