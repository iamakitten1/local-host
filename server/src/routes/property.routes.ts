import { Router } from "express";
import { prisma } from "../db.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";


const router = Router();

router.get("/", requireAuth, requireRole(["OWNER", "MANAGER"]), async (_req, res) => {
    try {
        const properties = await prisma.property.findMany();

        res.json(properties);
    } catch (error) {
        console.error("Failed to fetch properties:", error);

        res.status(500).json({
            message: "Failed to fetch properties",
        });
    }
});

router.get("/:id", requireAuth, requireRole(["OWNER", "MANAGER"]), async (req, res) => {
    try {
        const { id } = req.params;

        const property = await prisma.property.findUnique({
            where: { id: id as string },
        });

        if (!property) {
            return res.status(404).json({
                message: "Property not found",
            });
        }

        res.json(property);
    } catch (error) {
        console.error("Failed to fetch property:", error);

        res.status(500).json({
            message: "Failed to fetch property",
        });
    }
});

router.post("/", requireAuth, requireRole(["OWNER"]), async (req, res) => {
    try {
        const { name, address } = req.body ?? {};

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({
                message: "Property name is required",
            });
        }

        const property = await prisma.property.create({
            data: {
                name: name.trim(),
                address: typeof address === "string" ? address : null,
            },
        });

        res.status(201).json(property);
    } catch (error) {
        console.error("Failed to create property:", error);

        res.status(500).json({
            message: "Failed to create property",
        });
    }
});

export default router;