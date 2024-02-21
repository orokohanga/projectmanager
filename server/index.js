// index.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/user', async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  res.json(user);
});

app.put('/user/:id', async (req, res) => {
    const id = req.params.id;
    const newName = req.body.name
    const updatedUser = await prisma.user.update({
        where: {id: parseInt(id)},
      data: {
        name: newName
      },
    });
    res.json(updatedUser);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
