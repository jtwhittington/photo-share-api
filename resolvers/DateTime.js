const { GraphQLScalarType } = require('graphql')

module.exports = new GraphQLScalarType({
    name: 'DateTime',
    description: 'A valid date time value.',
    parseValue: value => {
        return new Date(value)
    },
    serialize: value => {
        return new Date(value).toISOString()
    },
    parseLiteral: ast => {
        return ast.value
    }
})