import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { prisma } from "../db.js";


const router = Router();

router.get("/me", requireAuth, async (_req, res) => {
    try {
      const userId = res.locals.userId as string;
  
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          property: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
  
      if (!user) {
        res.status(404).json({
          message: "User profile not found",
        });
        return;
      }
  
      res.json(user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
  
      res.status(500).json({
        message: "Failed to fetch user",
      });
    }
  });


export default router;