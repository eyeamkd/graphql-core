const prisma = require('../utils/prisma');

function feed(parent, arguments, context, info){  
    const {filter, skip, take, orderBy} = arguments;  
    let query = '';  
    let whereQuery = filter? { 
        OR:[ 
            {url:{contains:filter} }, 
            {description:{contains:filter}}

        ]  
    } :{}
    const links = prisma.link.findMany({ where:whereQuery, skip, take, orderBy}); 
    
    const count = prisma.link.count({where:whereQuery}); 

    return {links,count};
}  

module.exports = {feed};