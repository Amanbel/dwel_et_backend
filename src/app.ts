import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import analyticsRoutes from "./routes/analytics.routes";
import extensionRoutes from "./routes/extension.routes";
import reportsRoutes from "./routes/reports.routes";
import settingsRoutes from "./routes/settings.routes";
import subscriptionsRoutes from "./routes/subscriptions.routes";
import usersRoutes from "./routes/users.routes";
import sessionsRoutes from "./routes/sessions.routes";
import { initializeDatabase } from "./config/database";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
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

app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/extension", extensionRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/subscriptions", subscriptionsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/sessions", sessionsRoutes);

app.use(
  (
    error: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    res.status(error.status || 500).json({
      message: error.message || "Internal server error",
    });
  },
);

const port = Number(process.env.PORT || 3000);

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`DWEL backend started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database initialization failed", error);
    process.exit(1);
  });

export default app;
