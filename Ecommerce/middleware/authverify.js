var jwt =require('jsonwebtoken');

module.exports=  (req, res, next) => {
    try {
        const token = req.headers["access-token"];
        const decoded = jwt.verify(token, "secretkey");
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};