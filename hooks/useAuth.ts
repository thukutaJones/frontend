"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  token: string;
  name: string;
}

export const useAuth = (
  allowedRoles: string[] = [],
  redirectPath = "/sign-in"
) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") router.push(redirectPath);

    const token = localStorage.getItem("access_token");

    if (!token) {
      router.push(redirectPath);
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        router.push(redirectPath);
        return;
      }

      setUser({ ...decoded, token });
    } catch (error) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      router.push(redirectPath);
    }
  }, []);

  return user;
};
