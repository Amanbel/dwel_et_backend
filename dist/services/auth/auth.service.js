"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshUserSession = exports.loginUser = exports.registerUser = void 0;
const user_repository_1 = require("../../repositories/user.repository");
const password_service_1 = require("./password.service");
const jwt_service_1 = require("./jwt.service");
const registerUser = async (name, email, password) => {
    const existing = await (0, user_repository_1.findUserByEmail)(email);
    if (existing)
        throw new Error("User exists");
    const passwordHash = await (0, password_service_1.hashPassword)(password);
    const user = await (0, user_repository_1.createUser)({
        name,
        email,
        passwordHash,
    });
    return (0, user_repository_1.publicUser)(user);
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await (0, user_repository_1.findUserByEmail)(email);
    if (!user)
        throw new Error("Invalid credentials");
    const valid = await (0, password_service_1.comparePassword)(password, user.passwordHash);
    if (!valid)
        throw new Error("Invalid credentials");
    return {
        accessToken: (0, jwt_service_1.createAccessToken)(user.id),
        refreshToken: (0, jwt_service_1.createRefreshToken)(user.id),
        user: (0, user_repository_1.publicUser)(user),
    };
};
exports.loginUser = loginUser;
const refreshUserSession = async (refreshToken) => {
    const decoded = (0, jwt_service_1.verifyRefreshToken)(refreshToken);
    return {
        accessToken: (0, jwt_service_1.createAccessToken)(decoded.userId),
        refreshToken: (0, jwt_service_1.createRefreshToken)(decoded.userId),
    };
};
exports.refreshUserSession = refreshUserSession;
//# sourceMappingURL=auth.service.js.map