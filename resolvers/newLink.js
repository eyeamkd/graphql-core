function newLink(parent, arguments, context, info){ 
  console.log("Create new link context", context);
    const newLink = context.prisma.link.create({
        data:{
          url: arguments.url,
          description: arguments.description,
        }
      }); 
      return newLink;
} 

module.exports = {newLink}