import crypto from "crypto";
import { query } from "../config/database";

export type DbUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  avatarUrl?: string | null;
  createdAt?: Date;
};

const mapUser = (row: any): DbUser => ({
  id: row.id,
  name: row.name,
  email: row.email,
  passwordHash: row.password_hash,
  role: row.role,
  avatarUrl: row.avatar_url,
  createdAt: row.created_at,
});

export const publicUser = (user: DbUser) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatarUrl: user.avatarUrl,
});

export const createUser = async (input: { name: string; email: string; passwordHash: string }) => {
  const id = crypto.randomUUID();

  await query(
    "INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)",
    [id, input.name, input.email.toLowerCase(), input.passwordHash],
  );

  const user = await findUserById(id);
  if (!user) throw new Error("User creation failed");
  return user;
};

export const findUserByEmail = async (email: string) => {
  const rows = await query<any[]>("SELECT * FROM users WHERE email = ? LIMIT 1", [email.toLowerCase()]);
  return rows[0] ? mapUser(rows[0]) : null;
};

export const findUserById = async (id: string) => {
  const rows = await query<any[]>("SELECT * FROM users WHERE id = ? LIMIT 1", [id]);
  return rows[0] ? mapUser(rows[0]) : null;
};
