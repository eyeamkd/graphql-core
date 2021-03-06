const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');  
const pubsub = require('../utils/pubsub'); 
const prisma = require('../utils/prisma');
const {getTokenPayload, getUserId,APP_SECRET} = require('../utils'); 



async function signup(parent, arguments, context, info) {
    const password = await bcrypt.hash(arguments.password, 10); 
    const user = await context.prisma.user.create({
        data: {
            name: arguments.name,
            password,
            email: arguments.email,
        }
    })  
    // console.log("User id is", user.id)
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token, user
    }

}

async function login(parent, arguments, context, info) {
    const user = await context.prisma.user.findUnique({ where: { email: arguments.email } });
    if(!user){
        throw new Error('Invalid Email or Password'); 
    } 

    const match = bcrypt.compare(arguments.password,user.password); 

    if(!match){
        throw new Error('Invalid Email or Password'); 
    } 

    const token = jwt.sign({userId:user.id},APP_SECRET) 

    return { 
        token,user
    }
} 

 

async function newLink(parent, args, context, info) { 
    const { userId } = context;
    console.log("User id is",userId);
    const newLink =  await context.prisma.link.create({
      data: {
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
      }
    }) 
    pubsub.publish("NEW_LINK",newLink); 
    return newLink;
  } 

  async function vote(parent, args, context, info){ 
      const {userId} = context; 
        console.log("here",prisma.vote)
      const checkVote = await prisma.vote.findUnique({
          where:{
              linkId_userId:{
                  linkId: Number(args.linkId),
                  userId:userId
              }
          }
      }) 

      if(Boolean(checkVote)){ 
          throw new Error('Already voted for this link with the Id',args.linkId); 
      } 

      const vote = await prisma.vote.create({
          data:{
              user:{connect:{id:userId}},
              link:{connect:{id:Number(args.linkId)}}
          }
      })

      pubsub.publish("NEW_VOTE",vote); 
      return vote;
 
  }

module.exports = {login,newLink,signup,vote}



