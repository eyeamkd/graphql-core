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
      newLink: (parent, arguments) => {  
          let len = links.length + 1;
          let link = {
            id:`link-${len}-${Date.now()}`,
            url: arguments.url,
            description: arguments.description,
          }
        links.push(link); 
        return link
      },
      updateLink:(parent,arguments)=>{
        let resultIndex;
        let result = links.find((link,index)=> { 
           if(link.id==arguments.id){
               resultIndex = index;
               return true;
           }
        });
        let link = {id:arguments.id,url:arguments.url,description:arguments.description}; 
        links[resultIndex] = link; 
        return `Link ${result.id} successfully updated`
      },
      deleteLink:(parent, arguments)=>{
        let newLinks = links.filter(link=> link.id==arguments.id) 
        links = newLinks;
        return `Link ${arguments.id} successfully deleted`
      }
    },
  };

module.exports = { resolvers,links };
