const prisma = require('../utils/prisma'); 

async function postedBy(parent){  
    console.log("Inside posted by",arguments);
    return  prisma.link.findUnique({where:{id:parent.id}}).postedBy()
} 

async function votes(parent){ 
    return prisma.link.findUnique({where:{id:parent.id}}).votes()
}


module.exports = {
    postedBy,votes
}