"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = void 0;
const user_repository_1 = require("../repositories/user.repository");
const me = async (req, res) => {
    const user = await (0, user_repository_1.findUserById)(req.user.userId);
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json((0, user_repository_1.publicUser)(user));
};
exports.me = me;
//# sourceMappingURL=users.controller.js.map