"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jwt_service_1 = require("../services/auth/jwt.service");
const authenticate = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const token = auth.split(" ")[1];
    try {
        const decoded = (0, jwt_service_1.verifyAccessToken)(token);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map