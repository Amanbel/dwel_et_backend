import {
  createUser,
  findUserByEmail,
  publicUser,
} from "../../repositories/user.repository";

import { hashPassword, comparePassword } from "./password.service";

import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "./jwt.service";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existing = await findUserByEmail(email);

  if (existing) throw new Error("User exists");

  const passwordHash = await hashPassword(password);

  const user = await createUser({
    name,
    email,
    passwordHash,
  });

  return publicUser(user);
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) throw new Error("Invalid credentials");

  const valid = await comparePassword(password, user.passwordHash);

  if (!valid) throw new Error("Invalid credentials");

  return {
    accessToken: createAccessToken(user),

    refreshToken: createRefreshToken(user.id),

    user: publicUser(user),
  };
};

export const refreshUserSession = async (refreshToken: string) => {
  const decoded = verifyRefreshToken(refreshToken) as any;
  return {
    accessToken: createAccessToken(decoded.userId),
    refreshToken: createRefreshToken(decoded.userId),
  };
};
