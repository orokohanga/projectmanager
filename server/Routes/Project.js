import express from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from './User.js';
const prisma = new PrismaClient();
const router = express.Router();

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const project = await prisma.project.findUnique({
        where: {
            id: id,
        },
        include: { contributors: true }
    })
        .then((data) => {
            if (!data.contributors) {
                data.contributors = [];
            }
            if (!data.tasks) {
                data.tasks = [];
            }
            res.json(data);
        })
        .catch((error) => {
            res.json({ error: error.message });
        });
})

router.get("/owner/:userID", verifyToken, async (req, res) => {
    const userID = req.params.userID;
    const projects = await prisma.project.findMany({
        where: {
            ownerId: userID,
        },
    });
    res.json(projects);
});


router.post("/create", verifyToken, async (req, res) => {
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