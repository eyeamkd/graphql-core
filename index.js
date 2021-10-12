const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const { resolvers, links } = require("./schema/index");
const path = require("path");
const fs = require("fs");

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, "./schema/schema.graphql"),
    "utf8"
  ),
  resolvers,
  //context object is just a passon object, that multiple resolvers can read and write to
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log("Server listening at ", url));
