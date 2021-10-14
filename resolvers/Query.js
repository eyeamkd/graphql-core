const prisma = require('../utils/prisma');

function feed(parent, arguments, context, info){  
    const {filter} = arguments;  
    let query = ''; 
    if(filter) 
        return prisma.link.findMany({
            where:{ 
                OR:[ 
                    {url:{contains:filter} }, 
                    {description:{contains:filter}}

                ]  
            } 
        }) 
    else
    return prisma.link.findMany({}); 
        }  

module.exports = {feed};