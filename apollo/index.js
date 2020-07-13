const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Author {
    name: String
    books: [Book]
  }
  type Chat {
    id: ID!
    from: String!
    content: String!
    createdAt: String!
  }

  type Mutation {
    createChat(content: String, from: String): Chat
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    authors: [Author]
    chat: Chat
  }
`;

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const authors = [
  {
    name: "J.K. Rowling",
    books: [
      {
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K. Rowling"
      },
      {
        title: "Harry Potter 2",
        author: "J.K. Rowling"
      }
    ]
  },
  {
    name: "Michael Crichton",
    books: [
      { title: "Jurassic Park1", author: "Michael Crichton" },
      { title: "Jurassic Park2", author: "Michael Crichton" }
    ]
  }
];

const chat = {
  id: "1",
  from: "K",
  content: "deneme",
  createdAt: "14/07/2020T01:19"
};
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

//https://www.robinwieruch.de/graphql-apollo-server-tutorial
//https://www.howtographql.com/basics/2-core-concepts/
//https://www.tutorialspoint.com/graphql/graphql_mutation.htm
const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
    chat: () => chat
  },
  Mutation: {
    createChat: (parent, { content, from }, { me }) => {
      const chat1 = {
        id: "2",
        from: from == null ? "well" : from,
        content: content,
        createdAt: "14/07/2020T02:00"
      };

      return chat1;
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
