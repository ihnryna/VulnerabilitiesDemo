import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    //for security from csrf
    if (['POST', 'PUT', 'DELETE'].includes(req.method) && !req.headers['x-requested-with']) {
        return res.status(403).json({ message: "CSRF Attack detected!" });
    }

    if (!token) return res.status(401).json({ message: "No token" });

    try {
        req.user = jwt.verify(token, "SECRET_KEY");
        next();
    } catch {
        res.status(401).json({ message: "Invalid token" });
    }
};