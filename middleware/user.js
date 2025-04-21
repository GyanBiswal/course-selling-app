import jwt from 'jsonwebtoken';

function userMiddleware(req, res, next) {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];  // Split to get token after "Bearer"

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  try {
    // Verify the token and extract the userId from the payload
    const decoded = jwt.verify(token, process.env.JWT_USER_PASSWORD);
    
    // Attach the userId to the request object
    req.userId = decoded.userId;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If verification fails, send a response with status 403 (Forbidden)
    res.status(403).json({ message: 'Invalid or expired token' });
  }
}

export { userMiddleware };
