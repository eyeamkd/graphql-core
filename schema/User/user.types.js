const {gql} = require('apollo-server'); 

const userType = gql`   
    union Sex = Male | Female
    type User {
        name:String!,
        profession:String!,
        age:Int!,
        gender:Sex,
        posts:[Post]
    } 
` 

module.exports = {userType}