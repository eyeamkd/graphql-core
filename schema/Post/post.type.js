const {gql} = require('apollo-server'); 

const postType = gql`  
    type Post{
        title:String,
        creator:User!,
    }
`