"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refresh = exports.login = exports.register = void 0;
const auth_service_1 = require("../services/auth/auth.service");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await (0, auth_service_1.registerUser)(name, email, password);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await (0, auth_service_1.loginUser)(email, password);
        res.json(result);
    }
    catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
};
exports.login = login;
const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken)
            return res.status(400).json({ message: "refreshToken is required" });
        res.json(await (0, auth_service_1.refreshUserSession)(refreshToken));
    }
    catch {
        res.status(401).json({ message: "Invalid refresh token" });
    }
};
exports.refresh = refresh;
const logout = async (req, res) => {
    res.json({
        message: "logged out",
    });
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map