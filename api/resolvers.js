const uuidv4 = require('uuid/v4');

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
      data.push({...calendar, id: uuidv4() })
      return calendar
    }
  }
}

module.exports = resolvers
