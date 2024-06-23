var jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token Not Found or Valid' });
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    req.refUserId = decoded.userID; 
    console.log(req.refUserId);
    next()
  } catch (error) {
    return res.json({
      message: "You've not logged in! Please login first"
    })
  }
}

module.exports = verifyToken;