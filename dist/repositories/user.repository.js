"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.findUserByEmail = exports.createUser = exports.publicUser = void 0;
const crypto_1 = __importDefault(require("crypto"));
const database_1 = require("../config/database");
const mapUser = (row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role,
    avatarUrl: row.avatar_url,
    createdAt: row.created_at,
});
const publicUser = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatarUrl: user.avatarUrl,
});
exports.publicUser = publicUser;
const createUser = async (input) => {
    const id = crypto_1.default.randomUUID();
    await (0, database_1.query)("INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)", [id, input.name, input.email.toLowerCase(), input.passwordHash]);
    const user = await (0, exports.findUserById)(id);
    if (!user)
        throw new Error("User creation failed");
    return user;
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
    const rows = await (0, database_1.query)("SELECT * FROM users WHERE email = ? LIMIT 1", [email.toLowerCase()]);
    return rows[0] ? mapUser(rows[0]) : null;
};
exports.findUserByEmail = findUserByEmail;
const findUserById = async (id) => {
    const rows = await (0, database_1.query)("SELECT * FROM users WHERE id = ? LIMIT 1", [id]);
    return rows[0] ? mapUser(rows[0]) : null;
};
exports.findUserById = findUserById;
//# sourceMappingURL=user.repository.js.map