const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const { resolvers, links } = require("./schema/index");
const path = require("path");
const fs = require("fs");
const { getUserId } = require("./utils");  
const {PubSub} = require("graphql-subscriptions"); 


const prisma = new PrismaClient(); 
const pubsub = new PubSub(); 



const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, "./schema/schema.graphql"),
    "utf8"
  ),
  resolvers,
  //context object is just a passing  object, that multiple resolvers can read and write to
  context: ({ req }) => ({
    ...req, //attaching request object so that it is available to the resolvers to access the data inside it, for example the request headers
    prisma, 
    pubsub,
    userId: req && req.headers.authorization ? getUserId(req) : null,
  }),
});

server.listen().then(({ url }) => console.log("Server listening at ", url));
