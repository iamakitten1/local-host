
import type { Request, Response, NextFunction } from "express";
import { supabase } from "../supabase.js";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Authentication required",
    });
    return;
  }

  const token = authHeader.slice(7).trim();

  if (!token) {
    res.status(401).json({
      message: "Authentication required",
    });
    return;
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      res.status(401).json({
        message: "Invalid or expired token",
      });
      return;
    }

    res.locals.userId = data.user.id;
    
    next();
  } catch (error) {
    console.error("Authentication verification failed:", error);

    res.status(503).json({
      message: "Authentication service unavailable",
    });
  }
};
