const jwt = require('jsonwebtoken'); 
const APP_SECRET = 'KUNAL_DUBEY_IS_WORLDS_BEST_ENTREPRENEUR';

function getTokenPayload(token){  
    //THE JWT token is made by signing the userId with the above key, so using which we 
    // can retrieve the user id 
    return jwt.verify(token,APP_SECRET); 
} 

function getUserId(req,authToken){ 
    if(req){
        const authHeader = req?.headers?.authorization; 
        if(authHeader){  
            const token = authHeader.replace('Bearer','');  
            if(!token){  
                //Never Expose the vulnerability in this way 
                throw new Error("Invalid Authorization Header"); 
            }
            const {userId} = getTokenPayload(token);  
            return userId; 
        }
    }else if(authToken){
        const {userId} = getTokenPayload(authToken); 
        return userId; 
    }

}

module.exports = {APP_SECRET,getUserId,getTokenPayload};