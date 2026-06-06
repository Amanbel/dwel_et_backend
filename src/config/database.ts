import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.MYSQLHOST || "localhost",
  port: Number(process.env.MYSQLPORT || 3306),
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "dwel_et",
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  namedPlaceholders: true,
});

export const query = async <T = any>(
  sql: string,
  params: any[] | Record<string, any> = [],
) => {
  const [rows] = await pool.execute(sql, params);
  return rows as T;
};

export const initializeDatabase = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(160) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(80) NOT NULL DEFAULT 'Standard Lab User',
      avatar_url TEXT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS refresh_tokens (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      token_hash VARCHAR(255) NOT NULL,
      expires_at DATETIME NOT NULL,
      revoked_at DATETIME NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_refresh_user (user_id),
      CONSTRAINT fk_refresh_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS content_events (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      platform VARCHAR(80) NOT NULL,
      url TEXT NULL,
      title TEXT NULL,
      description TEXT NULL,
      hashtags JSON NULL,
      duration_seconds INT NOT NULL DEFAULT 0,
      topics JSON NOT NULL,
      emotions JSON NOT NULL,
      sentiment VARCHAR(40) NOT NULL DEFAULT 'neutral',
      risk_level VARCHAR(40) NOT NULL DEFAULT 'low',
      wellbeing_score DECIMAL(6,2) NOT NULL DEFAULT 50,
      confidence DECIMAL(5,2) NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_events_user_created (user_id, created_at),
      INDEX idx_events_platform (platform),
      CONSTRAINT fk_events_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL UNIQUE,
      plan VARCHAR(40) NOT NULL DEFAULT 'free',
      status VARCHAR(40) NOT NULL DEFAULT 'active',
      provider VARCHAR(40) NULL,
      provider_customer_id VARCHAR(255) NULL,
      current_period_end DATETIME NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_sub_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS reports (
      id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      type ENUM('daily','weekly','monthly') NOT NULL,
      title VARCHAR(255) NOT NULL,
      date_range VARCHAR(120) NOT NULL,
      summary TEXT NOT NULL,
      score DECIMAL(6,2) NOT NULL DEFAULT 0,
      deep_work_hours DECIMAL(6,2) NOT NULL DEFAULT 0,
      fatigue_risk VARCHAR(20) NOT NULL DEFAULT 'Low',
      focus_percentage INT NOT NULL DEFAULT 0,
      disruption_percentage INT NOT NULL DEFAULT 0,
      calm_percentage INT NOT NULL DEFAULT 0,
      stress_percentage INT NOT NULL DEFAULT 0,
      neutral_percentage INT NOT NULL DEFAULT 0,
      recommendations JSON NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_reports_user_type (user_id, type),
      CONSTRAINT fk_reports_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);
};

export default { query, pool, initializeDatabase };
