const { ApolloServer } = require("apollo-server");
const { resolvers, links } = require("./schema/index");
const path = require("path");
const fs = require("fs");

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, "./schema/schema.graphql"),
    "utf8"
  ),
  resolvers,
});

server.listen().then(({ url }) => console.log("Server listening at ", url));
