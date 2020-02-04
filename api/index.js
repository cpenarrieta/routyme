const fastify = require('fastify')

const graphqlPlugin = require('./graphql.js')

const app = fastify({
  logger: true
})

app.register(graphqlPlugin)

app.listen(4001)
