const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
      console.log("In verify Token")
      const authtoken = req.headers["Authorization"] || req.headers["authorization"];
      if (!authtoken) {
        res.StatusCode = 400;
        throw new Error('Unauthorized: No token provided');
      }
     const token = authtoken.split(' ')[1];
     const SECRET_KEY = process.env.SECRET_KEY
      try{
          const curuser = jwt.verify(token,SECRET_KEY);
          req.current = curuser
          next();     
      }
      catch (err) {
        res.StatusCode = 400;
        throw new Error("error decoted token");
      }
}
module.exports = {
    verifyToken
}