import jwt from "jsonwebtoken";

const extractJwt = (req, _, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return next();

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next();
    }
    req.user = user;

    return next();
  });
};

export default extractJwt;
