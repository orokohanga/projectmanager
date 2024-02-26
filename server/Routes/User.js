import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const router = express.Router();

export const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.sendStatus(403);
    }
}

router.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

router.get("/user/:id", async (req, res) => {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: { projectOwned: true, contributor: true }
    })
        .then((data) => {
            if (!data.projectOwned) {
                data.projectOwned = [];
            }
            if (!data.contributor) {
                data.contributor = [];
            }
            res.json(data);
        })
        .catch((error) => {
            res.json({ error: error.message });
        });
});

router.put("/user/:id", async (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
            name: newName,
        },
    });
    res.json(updatedUser);
});

router.post("/login", async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                name,
            },
        });

        if (!user) {
            return res
                .status(400)
                .json({ message: "Username or password is incorrect" });
        }

        if (!user.password) {
            return res.status(500).json({ message: "User data is invalid" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res
                .status(400)
                .json({ message: "Username or password is incorrect" });
        }

        const token = jwt.sign({ id: user.id }, "secret");
        res.json({ token, userID: user.id, name: user.name});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hash,
        },
    });
    const token = jwt.sign({ id: user.id }, "secret");
    res.json({ token, userID: user.id, name: user.name });
});

export { router as userRouter };
