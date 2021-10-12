const { ApolloServer } = require("apollo-server");
// const { resolvers } = require("./schema/index");
const path = require("path");
const fs = require("fs");

const resolvers = {
  Query: {
    info: () => null,
    //used to resolve the feed query that was placed
    feed: () => links,
  },
  Mutation: {
    newPost: (parent, context) => ({
      id,
      url: context.url,
      description: context.description,
    }),
  },
};



const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, './schema/schema.graphql'),
    "utf8"
  ),
  resolvers,
});

server.listen().then(({ url }) => console.log("Server listening at ", url));
