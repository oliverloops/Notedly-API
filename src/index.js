// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

let port = process.env.PORT || 8000;
// Schema
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String!
    notes: [Note!]!
  }
`;
// Resolver
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    notes: () => notes
  }
};

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/api' });

const notes = [
  { id: 1, content: 'First Note', author: 'Jhon Doe' },
  { id: 2, content: 'Second Note', author: 'Jane Doe' },
  { id: 3, content: 'Third Note', author: 'Max Powers' }
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`
    GraphQL server running at http://localhost:${port}${server.graphqlPath}
  `);
});
