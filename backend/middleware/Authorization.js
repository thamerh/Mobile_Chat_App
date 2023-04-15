import jwt from "jsonwebtoken";
const Protect = async (req, res, next) => {
try {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];
if(token == null) return res.status(401).json("Not authorized, no token");
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
     req.user = decoded.userId;
    console.log(decoded)
    next();
})
    } catch (error) {
      res.status(401).json("Not authorized, token failed");
    }
};

export default  Protect ;