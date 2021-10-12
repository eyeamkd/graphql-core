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
    info: () => null,
    //used to resolve the feed query that was placed
    feed: () => links,
  }, 
  Mutation:{
      newPost:(parent,context)=>({
          id,
          url:context.url,
          description:context.description
      })
  }
};

module.exports = { resolvers };
