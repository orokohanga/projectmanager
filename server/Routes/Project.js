import express from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from './User.js';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            include: {
                contributors: true
            }
        });
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


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
});

router.get("/owner/:userID", verifyToken, async (req, res) => {
    const userID = req.params.userID;
    const projects = await prisma.project.findMany({
        where: {
            ownerId: userID,
        },
        include: {
            contributors: {
                include: {
                    user: true
                }
            }
        }
    });
    res.json(projects);
});

router.get("/contributed/:userID", verifyToken, async (req, res) => {
    const userID = req.params.userID;
    const projects = await prisma.project.findMany({
        where: {
            contributors: {
                some: {
                    userId: userID
                }
            }
        },
        include: {
            contributors: {
                include: {
                    user: true
                }
            },
            owner: true
        }
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

router.get("/contributors/:id", async (req, res) => {
    const projectId = req.params.id;
    const contributors = await prisma.contributor.findMany({
        where: {
            projectId: projectId
        }
    });
    res.json(contributors);
});

router.put("/contributor/:id/join/", async (req, res) => {
    const projectId = req.params.id;
    const userId = req.body.userId;

    try {
        const contributor = await prisma.contributor.create({
            data: {
                userId: userId,
                projectId: projectId
            }
        });

        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: {
                contributors: {
                    connect: { id: contributor.id } 
                }
            },
        });
        res.json(updatedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/contributor/:id/leave", async (req, res) => {
    const projectId = req.params.id;
    const userId = req.body.userId;

    try {

        const contributor = await prisma.contributor.findFirst({
            where: {
                projectId: projectId,
                userId: userId
            }
        });


        if (!contributor) {
            return res.status(404).json({ message: "Contributor not found for this project" });
        }

        await prisma.contributor.delete({
            where: {
                id: contributor.id
            }
        });

        res.json({ message: "Contributor successfully left the project." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


export { router as projectRouter };