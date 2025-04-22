import jwt from "jsonwebtoken";

export const AuthGuard = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        const bearer = auth?.split(' ')[0];
        if (!auth || !bearer) {
            return res.status(401).json({
                statusCode: 401,
                message: "Authorization error"
            });
        }
        const token = auth?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                statusCode: 401,
                message: "Token not found"
            });
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        if (!decodedToken) {
            return res.status(401).json({
                statusCode: 401,
                message: "Token expired"
            });
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}