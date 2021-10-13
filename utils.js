const jwt = require("jsonwebtoken");
const APP_SECRET = "KUNAL_DUBEY_IS_WORLDS_BEST_ENTREPRENEUR";

function getTokenPayload(token) {
  //THE JWT token is made by signing the userId with the above key, so using which we
  // can retrieve the user id
    console.log("token and secret", token, APP_SECRET );
  const verifiedToken=  jwt.verify(token, APP_SECRET); 
  console.log("Verified token", verifiedToken); 
  return verifiedToken;
}

function getUserId(req, authToken) {
  if (req) {
    const token = req?.headers?.authorization;
    if (token) {
    //   console.log("Token is", token);
      if (!token) {
        //Never Expose the vulnerability in this way
        throw new Error("Invalid Authorization Header");
      }
      const  tokenFromPayload  = getTokenPayload(token);  
    //   console.log("token from payload",tokenFromPayload);
      const userId = tokenFromPayload.userId; 
    //   console.log("User Id is", userId);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }
}

module.exports = { APP_SECRET, getUserId, getTokenPayload };
