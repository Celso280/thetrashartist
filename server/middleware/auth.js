require('dotenv').config()
const jwt = require('jsonwebtoken')

// We are verifying if the token from the user is valid
// If valid we are giving them the authorization to access the private end points / routes

const verifyToken = (request, response, next) => {
    const token = request.headers.authorization
    // check kung merong token line 7 - 11
    if (!token){
        return(
            response.status(403).json({error:'invalid token'})
        )
    }

    // token verification || need to ask M.Teofy about this
    try {
        jwt.verify(token.split(" ")[1], process.env.jwt_secret, (error, user) => {
            if(error){
                return(
                    response.sendStatus(403)
                )  
            } else {
                request.user = user
                next()
            }   
    })
      } catch (error) {
        console.error(error);  
      }
   
}

module.exports = verifyToken

