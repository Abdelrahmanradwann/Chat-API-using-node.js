const jwt = require("jsonwebtoken");

const generate =  async(payload) =>{
    const SECRET_KEY = process.env.SECRET_KEY
    const token = await jwt.sign(payload , SECRET_KEY, { expiresIn: '24h' });
    return token;
}

module.exports = {
    generate
}
