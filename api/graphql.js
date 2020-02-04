const { makeExecutableSchema } = require("graphql-tools");
const fastifyGQL = require('fastify-gql')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

function registerGraphQL(fastify, opts, next) {
  fastify.register(fastifyGQL, {
    schema,
    // jit: 1,
    graphiql: true
  })

  next()
}

module.exports = registerGraphQL
