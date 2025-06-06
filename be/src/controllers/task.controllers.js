import { Todo } from "../models/todo.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addTask = asyncHandler(async (req, res) => {
    const { title, description, status, priority, dueDate } = req.body;
    const todo = await Todo.create({
        userId: req.user._id,
        title,
        description,
        status,
        priority,
        dueDate,
    });

    const createdTodo = await Todo.findById(todo._id);

    res.status(201).json(
        new ApiResponse(201, createdTodo, "User registered successfully")
    );
});

const getTasks = asyncHandler(async (req, res) => {
    const { page = 1, limit = 100 } = req.query;
    const skip = (page - 1) * limit;

    const totalTodos = await Todo.countDocuments({ userId: req.user._id });

    const tasks = await Todo.find({ userId: req.user._id })
        .limit(parseInt(limit))
        .skip(parseInt(skip))
        .sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(
            200,
            {
                totalTodos,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalTodos / limit),
                tasks,
            },
            "Todos fetched successfully"
        )
    );
});

const updateTask = asyncHandler(async (req, res) => {
    const { title, description, status, priority, dueDate, id } = req.body;

    if (!id) {
        throw new ApiError(400, "Todo id is required");
    }

    const todo = await Todo.findById({ _id: id });
    if (!todo) {
        throw new ApiError(404, "Todo not found");
    }

    todo.title = title;
    todo.description = description;
    todo.status = status;
    todo.priority = priority;
    todo.dueDate = dueDate;

    await todo.save();

    res.status(200).json(
        new ApiResponse(200, todo, "Todo updated successfully")
    );
});

const deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const userId = req.user._id;
    if (!taskId) {
        throw new ApiError(400, "task id is required");
    }
    try {
        const todo = await Todo.findOne({ _id: taskId, userId });
        if (!todo) {
            throw new ApiError(404, "Todo not found");
        }

        await todo.deleteOne();

        res.status(200).json(
            new ApiResponse(200, todo, "Todo deleted successfully")
        );
    } catch (error) {
        console.log(error);
    }
});

const getTaskById = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const userId = req.user._id;
    if (!taskId) {
        throw new ApiError(400, "Task id is required");
    }
    const task = await Todo.findOne({ _id: taskId, userId });
    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    res.status(200).json(
        new ApiResponse(200, task, "Task fetched successfully")
    );
});

export { getTasks, addTask, updateTask, deleteTask, getTaskById };
