import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

router.post("/create", async (req, res) => {
    const { name, ownerId } = req.body;
    const newProject = await prisma.project.create({
        data: {
            name,
            ownerId
        },
    });
    res.json(newProject);
});

router.put("/contributor/:id/join/", async (req, res) => {
    const id = req.params.id;
    const updatedProject = await prisma.project.update({ where: { id: id }, data: req.body });
    res.json(updatedProject);
});

export { router as projectRouter };