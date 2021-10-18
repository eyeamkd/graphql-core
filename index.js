const { ApolloServer } = require("apollo-server-express");
const { PrismaClient } = require("@prisma/client");
const { links } = require("./schema/index");
const path = require("path");
const fs = require("fs");
const { getUserId } = require("./utils");
const pubsub = require("./utils/pubsub");
const prisma = require("./utils/prisma");
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link"); 
const Vote = require('./resolvers/vote');
const express = require("express");
const http = require("http");
const app = express();

const httpServer = http.createServer(app);
let resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Vote,
  Subscription: {
    newLinkSubscription: {
      subscribe: () => {
        console.log("Inside fun");
        return pubsub.asyncIterator(["NEW_LINK"]);
      },
      resolve: (payload) => {
        console.log("Payload is", payload);
        return payload;
      },
  },
    newVoteSubscription: {
      subscribe: () => pubsub.asyncIterator("NEW_VOTE"),
      resolve: (payload) => payload,
    },
  },
};
const schema = makeExecutableSchema({
  typeDefs: fs.readFileSync(
    path.join(__dirname, "./schema/schema.graphql"),
    "utf8"
  ),
  resolvers,
});

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
  },
  {
    server: httpServer,
    path: "/graphql",
  }
);

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, "./schema/schema.graphql"),
    "utf8"
  ),
  resolvers, //context object is just a passing  object, that multiple resolvers can read and write to
  context: async ({ req }) => ({
    ...req, //attaching request object so that it is available to the resolvers to access the data inside it, for example the request headers
    prisma,
    pubsub,
    userId: req && req.headers.authorization ? getUserId(req) : null,
  }),
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    },
  ],
});  

app.get('/',(req,res)=>{ 
  res.redirect('/graphql');
})

server.start().then(() => {
  server.applyMiddleware({ app });
  httpServer.listen(process.env.PORT || 4000, () => console.log("Server listening at http://localhost:4000"));
});
