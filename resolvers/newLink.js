function newLink(parent, arguments, context, info){
    const newLink = context.prisma.link.create({
        data:{
          url: arguments.url,
          description: arguments.description,
        }
      }); 
      return newLink;
} 

module.exports = {newLink}