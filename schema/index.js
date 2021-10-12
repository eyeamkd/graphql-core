const { gql } = require("apollo-server-core"); 
let links = [
  {
    id: "1234",
    url: "www.kunaldubey.com",
    description: "This is the website of Kunal Dubey",
  },
];

const resolvers = {
    Query: {
      info: () => "GraphQL query for the HackerNews API",
      //used to resolve the feed query that was placed
      feed: () => links,
    },
    Mutation: {
      newPost: (parent, arguments) => { 
        let link = { 
        id:`link-${links.length++}-${Date.now()}`,
        url: arguments.url,
        description: arguments.description,
        } 
        links.push(link); 
        return link;
      },
    },
  };

module.exports = { resolvers,links };
