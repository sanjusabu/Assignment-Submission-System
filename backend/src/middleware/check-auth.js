const jwt = require("jsonwebtoken");
const db  = require("../config/database");
require("dotenv").config();

module.exports = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ error: "Invalid Bearer token" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const result = await db.execute(`select * from Users where UID = ?`,[decodedToken.id]);
        if(result[0].length == 0) return res.status(401).json({error: "Invalid Bearer token, Authentication failed"});
        
        req.id = decodedToken.id;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid Bearer token, Authentication failed" });
    }
};


