require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateJwt = (user) => {
    return(
        jwt.sign(user, process.env.jwt_secret, { expiresIn: '1hr' })
    )    
}

module.exports = generateJwt