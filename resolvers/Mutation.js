const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken'); 
const {getTokenPayload, getUserId,APP_SECRET} = require('../utils')

async function signup(parent, arguments, context, info) {
    const password = await bcrypt.hash(arguments.password, 10);
    const token = jwt.sign({ userId: arguments.id }, APP_SECRET)
    const user = context.prisma.user.create({
        data: {
            name: arguments.name,
            password,
            email: arguments.email,
        }
    })

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

async function newLink(parent, arguments, context, info){
    const {userId} = context; // because we are sending the userId in the context 
    return await context.prisma.create({
        data:{
            url:arguments.url,
            description:arguments.description,
            postedBy:{connect:{id:userId}} //connecting the created link with the user 
        }
    })

} 

module.exports = {login,newLink,signup}



