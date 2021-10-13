function postedBy(parent, args, context){ 
    return context.prisma.link.findUnique({where:{id:parent.id}}).links()
} 


module.exports = {
    postedBy
}