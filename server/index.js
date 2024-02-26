// index.js

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/user/:id", async (req, res) => {
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
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
    res.json({ token, userID: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
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
  res.json(user);
});

app.put("/user/:id", async (req, res) => {
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

app.post("/project", async (req, res) => {
  const { name, ownerId } = req.body;
  const newProject = await prisma.project.create({
    data: {
      name,
      ownerId
    },
  });
  res.json(newProject);
});

app.put("/project/:id/join/", async (req, res) => {
  const id = req.params.id;
  const updatedProject = await prisma.project.update({where: { id: id },data: req.body});
  res.json(updatedProject);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
