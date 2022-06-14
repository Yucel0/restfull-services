const express = require("express");
const server = express();
const userRouter = require("./routers/users");
const verifyToken = require("./middleware/verify-token");
const port = process.env.PORT || "3000";

server.use(express.json());
server.use("/users",verifyToken);
server.use("/users",userRouter);
server.listen(port);