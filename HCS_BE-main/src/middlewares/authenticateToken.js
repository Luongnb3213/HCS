
import jwt from 'jsonwebtoken'


export const authenticateToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

 
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    next(); 
  });
};

