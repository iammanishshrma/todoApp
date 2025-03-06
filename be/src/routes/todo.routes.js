import { Router } from "express";
import {
    addTodo,
    deleteTodo,
    getTodos,
    updateTodo,
} from "../controllers/todo.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getTodos);
router.route("/").post(verifyJWT, addTodo);
router.route("/").put(verifyJWT, updateTodo);
router.route("/").delete(verifyJWT, deleteTodo);

export default router;
