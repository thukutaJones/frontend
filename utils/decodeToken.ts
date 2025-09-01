"use server";

import jwt from "jsonwebtoken";

export async function decodeToken(token: string) {
  if (!token) {
    return null;
  }
  try {
    const decoded = jwt.decode(token);
    console.log(decoded)
    return decoded;
  } catch (error) {
    return null;
  }
}
