// index.js
import express from "express";
import { PrismaClient } from "@prisma/client";
import {userRouter} from "./Routes/User.js";
import {projectRouter} from "./Routes/Project.js";
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/auth", userRouter);

app.use("/project", projectRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
