const data = require('./data')

const resolvers = {
  Query: {
    calendars() {
      return data
    },
    calendar(_, {day}) {
      return data.filter(d => d.day === day)
    }
  },
  Mutation: {
    createCalendar(_, { calendar }) {
      data.push(calendar)
      return calendar
    }
  }
}

module.exports = resolvers
