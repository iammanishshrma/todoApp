import express from "express";
import cors from "cors";

const app = express();

//configuration middleware
// Used to allow cross origins
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(
    express.json({
        limit: "16kb",
    })
);
app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);
//To store files on local server in /public
app.use(express.static("public"));

//Routes import
import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js";
import { ApiResponse } from "./utils/ApiResponse.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/health", (_, res) => {
    res.status(200).json(
        new ApiResponse(200, null, "Server is up and running")
    );
});

export { app };
