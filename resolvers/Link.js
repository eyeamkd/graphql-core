async function postedBy(){  
    console.log("Inside posted by",arguments);
    return  await context.prisma.link.findUnique({where:{id:parent.id}}).postedBy()
} 


module.exports = {
    postedBy
}