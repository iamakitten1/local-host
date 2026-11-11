
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../db.js";

export function requireRole(allowedRoles: string[]) {
  return async (_req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.userId as string;

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });

      if (!user) {
        res.status(403).json({
          message: "User profile not found",
        });
        return;
      }

      if (!allowedRoles.includes(user.role)) {
        res.status(403).json({
          message: "Access denied",
        });
        return;
      }

      next();
    } catch (error) {
      console.error("Failed to check user role:", error);

      res.status(500).json({
        message: "Failed to check permissions",
      });
    }
  };
}
