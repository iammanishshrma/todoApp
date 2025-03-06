import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true, // Ensure every todo belongs to a user
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "in-progress"], // Use enum for predefined values
            default: "pending",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"], // Enum for priority values
            default: "low",
        },
        dueDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export const Todo = mongoose.model("Todo", todoSchema);
