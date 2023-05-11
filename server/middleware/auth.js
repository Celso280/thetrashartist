require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyToken = (request, response, next) => {
    const token = request.headers.authorization
    // check kung merong token line 8 - 12
    if (!token){
        return(
            response.status(403).json({error:'invalid token'})
        )
    }

    // token verification
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

