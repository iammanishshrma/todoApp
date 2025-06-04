import { Router } from "express";
import {
    addTask,
    deleteTask,
    getTaskById,
    getTasks,
    updateTask,
} from "../controllers/task.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getTasks);
router.route("/").post(verifyJWT, addTask);
router.route("/").put(verifyJWT, updateTask);
router.route("/").delete(verifyJWT, deleteTask);
router.route("/:taskId").get(verifyJWT, getTaskById);

export default router;
