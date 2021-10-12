const { gql } = require("apollo-server-core");

const typeDefs = gql`  
type Query{  
    info:String!
    feed:[Link!]
}, 

type Link{
    url:String!,
    id:ID!,
    description:String!
}
`  

let links = [{ 
    id:'1234',
    url:'www.kunaldubey.com',
    description:'This is the website of Kunal Dubey'
}]

const resolvers = { 
    Query:{
        info:()=>'This is an GraphQL API for HackerNews clone', 
        //used to resolve the feed query that was placed
        feed:()=>links,
    }, 
    Link:{
        id:(parent)=> parent.id, 
        url:(parent)=> parent.url,
        description:(parent)=> parent.description
    }

} 

module.exports = {typeDefs,resolvers}