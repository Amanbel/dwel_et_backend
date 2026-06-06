import crypto from "crypto";
import { query } from "../config/database";

export const getSubscriptionByUserId = async (userId: string) => {
  const rows = await query<any[]>("SELECT * FROM subscriptions WHERE user_id = ? LIMIT 1", [userId]);
  return rows[0] || null;
};

export const upsertSubscription = async (userId: string, plan: string, provider?: string) => {
  const existing = await getSubscriptionByUserId(userId);
  if (existing) {
    await query(
      "UPDATE subscriptions SET plan = ?, status = 'active', provider = COALESCE(?, provider) WHERE user_id = ?",
      [plan, provider || null, userId],
    );
  } else {
    await query(
      "INSERT INTO subscriptions (id, user_id, plan, status, provider) VALUES (?, ?, ?, 'active', ?)",
      [crypto.randomUUID(), userId, plan, provider || null],
    );
  }
  return getSubscriptionByUserId(userId);
};
