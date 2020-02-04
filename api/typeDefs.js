const typeDefs = `
  scalar Date

  enum Day {
    MONDAY
    TUESDAY
    WEDNESDAY
    THURSDAY
    FRIDAY
    SATURDAY
    SUNDAY
  }

  enum TimeSlot {
    MORNING
    AFTERNOON
    NIGHT
  }

  type User {
    id: ID
    name: String
    email: String
  }

  type Profile {
    id: ID
    user: User
    name: String
    age: Int
  }

  type Calendar {
    id: ID
    image: String
    label: String
    day: Day
    time: TimeSlot
    user: User
    order: Int
  }

  input UserInput {
    id: ID
  }

  input CalendarInput {
    id: ID
    image: String
    label: String
    day: Day
    time: TimeSlot
    user: UserInput
    order: Int
  }

  type Query {
    calendars: [Calendar]
    calendar(day: Day): [Calendar]
  }

  type Mutation {
    createCalendar(calendar: CalendarInput): Calendar
  }
`

module.exports = typeDefs
