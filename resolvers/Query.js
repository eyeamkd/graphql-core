function feed(parent, arguments, context, info){ 
    return context.prisma.link.findMany(); 
} 

module.exports = {feed};