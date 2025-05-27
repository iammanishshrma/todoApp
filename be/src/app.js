import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

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
import taskRouter from "./routes/task.routes.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import { ApiError } from "./utils/ApiError.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/health", (_, res) => {
    res.status(200).json(
        new ApiResponse(200, null, "Server is up and running")
    );
});
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            data: err.data,
            stack:
                process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }

    // Fallback for unexpected errors
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
});

export { app };
