var jwt = require('jsonwebtoken');

// Authentication middleware  
const authMiddleware = (req, res, next) => {
    try { 
        const token = req.header("authorization");

        if (token) { 
            const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;

            // Verify the token using the secret key
            jwt.verify(tokenWithoutBearer, process.env.JWT_SEC, function(err, decoded) {
                if (err) {
                     
                    return res.status(401).send({ error: "Invalid or expired token" });
                }
                if (decoded && decoded.data) {
                    
                    req.user = decoded.data;
                    return next();  
                } else {
                    return res.status(400).send({ error: "Bad request! Invalid token data" });
                }
            });
        } else {
            return res.status(400).send({ error: "Authorization token not found" });
        }
    } catch (error) { 
        return res.status(500).send({ error: "Server error. Please try again later" });
    }
};

module.exports = authMiddleware;
