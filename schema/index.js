const { gql } = require("apollo-server-core"); 
const Query = require('../resolvers/Query')
const Mutation = require('../resolvers/Mutation')
const User = require('../resolvers/User')
const Link = require('../resolvers/Link') 
const newLinkSub = require('../subscriptions/NewLinkSub')

const resolvers = {
  Query, Mutation, User, Link, newLinkSub
}

// const resolvers = {
//   Query: {
//     info: () => "GraphQL query for the HackerNews API",
//     //used to resolve the feed query that was placed
//     feed: async (parent, arguments, context) => context.prisma.link.findMany(),
//   },
//   Mutation: {
//     newLink: (parent, arguments, context, info) => {
//       const newLink = context.prisma.link.create({
//         data:{
//           url: arguments.url,
//           description: arguments.description,
//         }
//       }); 
//       return newLink;
//     },

//     updateLink: (parent, arguments, context, info) => {
//       let resultIndex;
//       let result = links.find((link, index) => {
//         if (link.id == arguments.id) {
//           resultIndex = index;
//           return true;
//         }
//       });
//       let link = { id: arguments.id, url: arguments.url, description: arguments.description };
//       links[resultIndex] = link;
//       return `Link ${result.id} successfully updated`
//     },

//     deleteLink: (parent, arguments, context, info) => {
//       let newLinks = links.filter(link => link.id != arguments.id)
//       links = newLinks;
//       return `Link ${arguments.id} successfully deleted`
//     }
//   },
// };

module.exports = { resolvers };
