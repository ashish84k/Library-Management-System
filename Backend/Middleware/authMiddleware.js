const { verifyToken } = require("./helper");

// roles: array of allowed roles, e.g., ['admin', 'librarian']
const authMiddleware = (roles = []) => {

  return (req, res, next) => {
      
      try {
          const decoded = verifyToken(req); // helper me cookies se token read + verify
          
          if (!decoded) {
              return res.status(401).json({ success: false, message: "Unauthorized" });
            }
      
            // Attach user info
            req.user = {
        id: decoded.id,
        role: decoded.role,
      };
      
      // Role-based access check
      if (roles.length && !roles.includes(decoded.role)) {
          return res.status(403).json({ success: false, message: "Forbidden: Access denied" });
        }
      
        next(); // continue to route
    } catch (error) {
        console.error(error);
      res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
  };
};

module.exports = { authMiddleware };
