// const jwt = require("jsonwebtoken");

// const authenticateToken = (req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   jwt.verify(token, process.env.JWT_KEY, (err, user) => {
//     if (err) return res.status(403).json({ message: "invalid token" });
//   });

//   req.user = user;
//   next();
// };

// const isAdmin = (req, res, next) => {
//   console.log(req, user);
//   if (!req.user) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   console.log(req, user);

//   if (req.user.userRole !== "admin") {
//     return res.status(403).json({ message: "Admin access only" });
//   }

//   next();
// };

// module.exports = { authenticateToken, isAdmin };

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No Token Provided" });

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
};

module.exports = { authenticateToken, isAdmin };
 