
//used to find all the items in the link, operates as Select *
function feed(parent, arguments, context, info) { 
    return context.prisma.link.findMany();
} 


module.exports = {feed}
