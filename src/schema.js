const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `

type Status {
    occupied: Boolean,
    userid: String
}

type Message {
    id: ID!
    text: String,
    signature: String
}

type Query {
    status: Status,
    messages: [Message],
    message(id: ID!): Message
}

type Mutation {
    enterRoom(userid: String!): Status,
    addMessage(text: String!, signature: String): Message
}

type Subscription {
    statusChanged: Status,
    messageAdded: Message
}

`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
