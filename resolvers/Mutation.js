const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken'); 
const {getTokenPayload, getUserId} = require('../utils')

async function signup(parent, arguments, context, info) {
    const password = await bcrypt.hash(arguments.password, 10);
    const token = jwt.sign({ userId: arguments.id }, APP_SECRET)
    const user = context.prisma.create({
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

} 

module.exports = {signin, login,newLink }



