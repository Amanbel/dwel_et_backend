"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const extension_routes_1 = __importDefault(require("./routes/extension.routes"));
const reports_routes_1 = __importDefault(require("./routes/reports.routes"));
const settings_routes_1 = __importDefault(require("./routes/settings.routes"));
const subscriptions_routes_1 = __importDefault(require("./routes/subscriptions.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const sessions_routes_1 = __importDefault(require("./routes/sessions.routes"));
const database_1 = require("./config/database");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     process.env.CLIENT_ORIGIN || "http://localhost:5173",
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization",
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE, OPTIONS",
//   );
//   if (req.method === "OPTIONS") return res.sendStatus(204);
//   next();
// });
app.use(express_1.default.json({ limit: "1mb" }));
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/analytics", analytics_routes_1.default);
app.use("/api/extension", extension_routes_1.default);
app.use("/api/reports", reports_routes_1.default);
app.use("/api/settings", settings_routes_1.default);
app.use("/api/subscriptions", subscriptions_routes_1.default);
app.use("/api/users", users_routes_1.default);
app.use("/api/sessions", sessions_routes_1.default);
app.use((error, _req, res, _next) => {
    res.status(error.status || 500).json({
        message: error.message || "Internal server error",
    });
});
const port = Number(process.env.PORT || 3000);
(0, database_1.initializeDatabase)()
    .then(() => {
    app.listen(port, () => {
        console.log(`DWEL backend started on port ${port}`);
    });
})
    .catch((error) => {
    console.error("Database initialization failed", error);
    process.exit(1);
});
exports.default = app;
//# sourceMappingURL=app.js.map